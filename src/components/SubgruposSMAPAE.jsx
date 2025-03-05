import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import TrimestralesSMAPAE from "./TrimestralesSMAPAE.jsx";
const SubgruposSMAPAE = ({grupo,year}) => {
    
  const [data, setData] = useState([]);
  const LoadData = async() => {
    try 
    {
    const response = await fetch(`${api}/listSubcategoriesSMAPAE/${grupo}/`);
    const result = await response.json();
    setData(result);
    
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
        {data.map(item => (
            <div key={item.id}>
                <p className="text-gray-500 dark:text-gray-400">{item.name}</p>
                <TrimestralesSMAPAE  subgrupo={item.id} year={year}></TrimestralesSMAPAE>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>
        ))}
    </>
  );
};
export default SubgruposSMAPAE;
