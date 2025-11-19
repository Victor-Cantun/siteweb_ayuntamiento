import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import Trimestre from "./Trimestre.jsx";

const TrimestralesSMAPAE = ({subgrupo,year}) => {
    
  const [data, setData] = useState([]);
  const class_active = 'text-blue-600 border bg-blue-50 hover:bg-blue-100 hover:text-blue-700';
  const class_inactive = 'text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700';
  const LoadData = async() => {
    try 
    {
    const response = await fetch(`${api}/listDocumentsSMAPAE/${subgrupo}/${year}/`);
    const result = await response.json();
    setData(result);
    console.log(data);
    } catch (error) 
    {
      console.error("Error la data:", error);
    }
  }


  useEffect(() => {
    LoadData()

  }, [year]);

  return (
<>      
    <div>
      <nav aria-label="Page navigation example">  
        <ul className="inline-flex -space-x-px text-sm items-center">

          {data.length > 0 ? (
            data.map(doc => (
              <li key={doc.id}>
                {/* semestral */}
                {doc.periodo === "semestral" && (
                  <a
                    href={api + doc.document}
                    target="_blank"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {doc.semestre}
                  </a>
                )}

                {/* trimestral o null */}
                {(doc.periodo === "trimestral" || doc.periodo === null) && (
                  <a
                    href={api + doc.document}
                    target="_blank"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {doc.quarter}
                  </a>
                )}

                {/* anual */}
                {doc.periodo === "anual" && (
                  <a
                    href={api + doc.document}
                    target="_blank"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {doc.year}
                  </a>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-400 italic">No hay documentos</li>
          )}

        </ul>
      </nav>
    </div>
  </>
  );
};
export default TrimestralesSMAPAE;
