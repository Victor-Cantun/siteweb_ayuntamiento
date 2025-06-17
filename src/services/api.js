import axios from 'axios';

//const API_BASE_URL = 'http://127.0.0.1:8000/police';
const API_BASE_URL = 'https://admin.escarcega.gob.mx/police';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar tokens expirados
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          // Reintentar la petición original
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh, redirigir al login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const documentsAPI = {
  uploadDocument: (file, type, utilityType = null) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type.toString());

        // Solo agregar utility_type si es tipo 3 y se proporciona
    if (type === 7 && utilityType) {
      formData.append('utility_type', utilityType);
    }
    
    // Debug - mostrar lo que se está enviando
    console.log('Enviando archivo:', file);
    console.log('Tipo:', type);
    console.log('Sabe manejar:', utilityType);
    console.log('Tamaño del archivo:', file.size, 'bytes');
    console.log('Nombre del archivo:', file.name);
    
    return api.post('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getUserDocuments: () => api.get('/documents/user_documents/'),
  
  updateDocument: (id, file) => {
    const formData = new FormData();
    formData.append('document', file);
    
    console.log('Actualizando documento ID:', id);
    console.log('Nuevo archivo:', file);
    
    return api.patch(`/documents/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteDocument: (id) => api.delete(`/documents/${id}/`),
};

export const authAPI = {
  register: (userData) => api.post('/auth/register/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: (refreshToken) => api.post('/auth/logout/', { refresh_token: refreshToken }),
  getUserProfile: () => api.get('/user/profile/'),
};

export default api;