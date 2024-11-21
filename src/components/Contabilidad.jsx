import React, { useState, useEffect } from "react";
import ComponentGrupo from '../components/grupo.jsx';
import { api } from "../api/api.js";

const ContabilidadSMAPAC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listAccounting`);
      const result = await response.json();

      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
    <div className="w-[100%] bg-white">
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 w-full">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center justify-start" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
              <li className="me-2" role="presentation">
                  <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">AÑO DE EJERCICIO 2024</button>
              </li>
          </ul>
      </div>
      <div id="default-tab-content">
          <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800 w-full justify-start" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                TRIMESTRALES 2024
              </p>
          </div>
      </div>
      {data.map(item=>(<ComponentGrupo key={item.id} id={item.id} grupo={item.name} subgrupos={item.subgrupos} ></ComponentGrupo>))}
    </div>
    </>
  );
};
export default ContabilidadSMAPAC;
