import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import Trimestre from "./Trimestre.jsx";

const SevacDocuments = ({subgrupo,year}) => {
    
    const [data, setData] = useState([]);
    const class_active = 'text-blue-600 border bg-blue-50 hover:bg-blue-100 hover:text-blue-700';
    const class_inactive = 'text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700';
    const LoadData = async() => {
        try 
        {
        const response = await fetch(`${api}/sevac_listDocuments/${subgrupo}/${year}/`);
        const result = await response.json();
        setData(result);
        console.log(data);
        } catch (error) 
        {
            console.error("Error la data:", error);
        }
    }

    useEffect(() => {LoadData()}, [year]);

    return (
        <>
            <ol class="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
                {data.map(item => ( 
                    <>
                        <li key={item.id}>
                            <a target="_blank" href={api + item.document}>{item.name}</a>
                        </li>
                    </>
                    ))}  
            </ol>
        </>
    );
};
export default SevacDocuments;
