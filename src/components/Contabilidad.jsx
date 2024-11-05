import React, { useState, useEffect } from "react";
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
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Dependencia
              </th>
              <th scope="col" className="px-6 py-3">
                Año
              </th>
              <th scope="col" className="px-6 py-3">
                Trimestral
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre del archivo
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(_item => (
              <tr key={_item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {_item.dependence_detail.name}
                </th>
                <th>{_item.year}</th>
                <th>{_item.quarterly}</th>
                <th>
                  <a href={api + _item.document} className="text-cyan-600">
                    {_item.name}
                  </a>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ContabilidadSMAPAC;
