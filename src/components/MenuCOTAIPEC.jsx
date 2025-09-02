import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
const Menu = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch(`${api}/transparency/COTAIPEC/menu`);
        const result = await response.json();

        setData(result);
        }
        fetchData();
    }, []);    
    const renderMenu = (items, nivel = 0) => (
    <ul className={nivel === 0 ? "space-y-2" : "ml-4 border-l pl-4"}>
      {items.map((item) => {
        const esPadre = item.hijos.length > 0;

        return (
          <li key={item.id} className="mb-2">
            {item.archivo ? (
              <a
                href={api + item.archivo}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${
                  esPadre
                    ? "text-lg font-semibold text-red-700 hover:text-blue-900"
                    : "text-sm text-gray-600 hover:text-gray-800"
                }`}
              >
                {item.nombre}
              </a>
            ) : (
              <span
                className={`block ${
                  esPadre
                    ? "text-lg font-semibold text-red-700"
                    : "text-sm text-gray-600"
                }`}
              >
                {item.nombre}
              </span>
            )}

            {esPadre && renderMenu(item.hijos, nivel + 1)}
          </li>
        );
      })}
    </ul>
    );

    return (    <div className="p-4 bg-gray-50 rounded shadow">
      {renderMenu(data)}
    </div>);
}
export default Menu;