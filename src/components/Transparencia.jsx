import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import { Accordion, AccordionPanel, AccordionTitle } from "flowbite-react";
import DependencesComponent from '../components/Dependences.jsx'
const TransparenciaComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listCategoryTransparency`);
      const result = await response.json();

      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
      <Accordion collapseAll >
        {data.map((item,index)=>(
        <Accordion.Panel key={index}>
          <Accordion.Title className="bg-cherry text-white hover:bg-red-900">{item.name}</Accordion.Title>
          <Accordion.Content>
            <DependencesComponent category={item.id} dependences={item.dependences}></DependencesComponent>
          </Accordion.Content>
        </Accordion.Panel>
        ))}
      </Accordion>



    </>

  );
};
export default TransparenciaComponent;
