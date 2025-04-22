import React,{ useState, useEffect }  from 'react'
import { api } from "../api/api.js";
const GacetaComponent = ({year}) => {
    const [data, setData] = useState([]);
      useEffect(() => {
        LoadList(year)
      }, []);
    const LoadList = async() => {
        const response = await fetch(`${api}/listGazette?year=${year}`);
        const result = await response.json();
        console.log(result);
        setData(result);
    }
  return (
    <>
        <table className="z-0 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th colSpan="3" className="px-6 py-3" >
                        <h2 className="text-cherry font-bold tracking-tigh text-center">GACETA</h2>
                    </th>
                </tr>
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Año
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Mes
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Archivo
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map(_item =>(

                    <tr key={_item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                            {_item.year}
                        </td>                
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {_item.month}
                        </td>
                        <td className="px-6 py-4">
                            <a href={api+_item.document} target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                                    <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                </svg>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>    
    </>
  )
}
export default GacetaComponent;
