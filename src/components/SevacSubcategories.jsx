import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import SevacDocuments from "./SevacDocuments.jsx";

const SevacSubcategories = ({grupo,year}) => {
    
    const [data, setData] = useState([]);
    const LoadData = async() => {
        try 
        {
        const response = await fetch(`${api}/sevac_listSubcategories/${grupo}/`);
        const result = await response.json();
        setData(result);
        
        } catch (error) 
        {
        console.error("Error la data:", error);
        }
    }

    useEffect(() => {LoadData()}, [year]);

    return (
        <>
            {data.map(item => (
                <div key={item.id}>
                    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h2>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <SevacDocuments  subgrupo={item.id} year={year}></SevacDocuments>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                </div>
            ))}
        </>
    );
};
export default SevacSubcategories;
