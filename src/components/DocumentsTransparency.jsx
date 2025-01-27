import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import { Accordion } from "flowbite-react";
import DependencesComponent from '../components/Dependences.jsx'
const DocumentsTransparencyComponen = ({category,dependence}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listDocumentsTransparency/${category}/${dependence}`);
      const result = await response.json();

      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
        {data.map((item,index)=>(
            <div key={index}>
                <p><a href={api+item.document} target="_blank">{item.name}</a></p>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>
        ))}
    </>
    );
}
export default DocumentsTransparencyComponen;