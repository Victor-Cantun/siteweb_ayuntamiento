import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";

 const Gaceta = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listGazette`);
      const result = await response.json();

      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
      <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 shadow-sm">
            {data.map(_item => (
              <li key={_item.id} className="p-2 hover:bg-gray-50 cursor-pointer">
                  <p className="text-lg font-medium leading-loose pl-4"><a href={api + _item.document} target="_blank">{_item.name}</a></p>
              </li>
            ))}        
      </ul>    
    </>
  );
};
export default Gaceta;
