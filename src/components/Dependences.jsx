import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import { Accordion } from "flowbite-react";
import DocumentsTransparencyComponent from '../components/DocumentsTransparency.jsx'
const DependencesComponent = ({category,dependences}) => {


  return (
    <>
      <Accordion collapseAll>
        {dependences.map((item,index)=>(
        <Accordion.Panel key={index}>
          <Accordion.Title className="bg-cherry text-white hover:bg-red-900">{item.name}</Accordion.Title>
          <Accordion.Content>
            <DocumentsTransparencyComponent category={category} dependence={item.id} ></DocumentsTransparencyComponent>
          </Accordion.Content>
        </Accordion.Panel>
        ))}
      </Accordion>
    </>
  );
};
export default DependencesComponent;
