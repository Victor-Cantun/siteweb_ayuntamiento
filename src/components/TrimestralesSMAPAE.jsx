import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";

const TrimestralesSMAPAE = ({subgrupo,year}) => {
    
  const [data, setData] = useState([]);
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
        
            <div >
                <nav aria-label="Page navigation example">
                  <ul className="inline-flex -space-x-px text-base h-10">
                  {data.map(item => (
                      <li key={item.id}>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{item.quarter}</a>                                  
                      </li>
                      ))}
                  </ul>
                </nav>
            </div>
        
    </>
  );
};
export default TrimestralesSMAPAE;
