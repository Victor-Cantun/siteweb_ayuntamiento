import React, { useState, useEffect } from "react";
import SevacSubcategories from "./SevacSubcategories.jsx";
import { api } from "../api/api.js";

const SevacSMAPAE = () => {
  const [years, setYears] = useState([]);
  const [yearSelect, setYearSelect] = useState(null);
  const [categories, setListCategories] = useState([]);

  const LoadYears = async() => {
    try 
    {
    const response = await fetch(`${api}/sevac_listYears`);
    const result = await response.json();
    setYears(result);
    setYearSelect(result[0].year); 
    //console.log(yearSelect)
    } catch (error) 
    {
      console.error("Error al obtener los años disponibles:", error);
    }
  }
  const LoadListCategories = async() => {
    const response = await fetch(`${api}/sevac_listCategories`);
    const result = await response.json();
    setListCategories(result);
  } 
  

  useEffect(() => {
    LoadYears()
    LoadListCategories()
  }, []);

  useEffect(() => {
    if (yearSelect) {
     // fetchData(year);
     console.log(yearSelect)
    }
  }, [yearSelect]);



  return (
    <>
    <div className="w-[100%]">
      <div className="w-full flex justify-start flex-col">
        <div className=" flex flex-row items-center ">
          <label className="max-w-80 pr-3 mb-2 text-base font-medium text-gray-900 dark:text-white">AÑO DE EJERCICIO:</label>
          <select  id="year" value={yearSelect || ""} onChange={(e) => setYearSelect(e.target.value)}  name="year"  className="max-w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {years.map(item=>(
                  <option key={item.year} value={item.year}>{item.year}</option>
              ))}
          </select>

        </div>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <p className="text-sm text-blue-500">Trimestrales / <span className="text-sm text-black">{yearSelect}</span></p>
      </div>
      {categories.map( (item, index) =>(
        <div key={index} className="w-full border border-gray-200 rounded-lg shadow my-4 rounded-t-lg">
              <h3 className="w-full px-6 py-3 bg-cherry text-white border rounded-t-lg">{item.name}</h3>
              <div className="bg-white text-black border rounded-b-lg px-4">
                <SevacSubcategories grupo = {item.id} year={yearSelect} ></SevacSubcategories>
              </div>
        </div>
      ))}


    </div>
    </>
  );
};
export default SevacSMAPAE;
