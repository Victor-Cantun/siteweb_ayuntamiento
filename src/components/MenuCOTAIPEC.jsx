import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

const Menu = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch(`${api}/transparency/COTAIPEC/menu`);
        const result = await response.json();

        setData(result);
        }
        fetchData();
    }, []);    
    const renderMenu = (items, nivel = 0) => 
         
    (
    <Accordion collapseAll>
      {items.map((item) => {
        const esPadre = item.hijos.length > 0;

        return (
          <Accordion.Panel key={item.id}>
            <Accordion.Title >
              {item.archivo ? (
                <a
                  href={api+item.archivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    esPadre
                      ? "text-lg font-semibold text-red-900 hover:text-gray-800"
                      : "text-sm text-gray-600 hover:text-blue-700"
                  }`}
                >
                  {item.nombre}
                </a>
              ) : (
                <span
                  className={`${
                    esPadre
                      ? "text-lg font-semibold text-red-900"
                      : "text-sm text-gray-600"
                  }`}
                >
                  {item.nombre}
                </span>
              )}
            </Accordion.Title>

            {esPadre && (
              <Accordion.Content>
                {renderMenu(item.hijos, nivel + 1)}
              </Accordion.Content>
            )}
          </Accordion.Panel>
        );
      })}
    </Accordion>
    );

    return (
      <>
        <h2 className="text-gray-700 text-center font-bold text-2xl p-5 ">OBLIGACIONES DE TRANSPAREENCIA</h2>  
        <div className="p-4 bg-gray-50 rounded shadow">
          {renderMenu(data)}
        </div>
      </>
    );
}
export default Menu;