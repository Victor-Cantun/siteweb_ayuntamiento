import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import Card from "./CardDependencia.jsx";
const Dependencias = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listDependences`);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);
  return (
    <section id="Dependencias" className=" bg-white pt-[4%] pb-[4%]">
      <div className=" ml-[2%] mr-[2%] w-auto  pt-[2%] pb-[2%]">
        <div className="w-full flex justify-center">
          <h2 className=" text-xl font-bold tracking-tight text-cherry py-3">DEPENDENCIAS</h2>
        </div>
        <div className="w-full py-5">
          <div className="mx-auto grid w-auto max-w-7xl gap-x-2 gap-y-10 px-6 lg:px-8 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 ">
            {data.map(_item => (
              <Card key={_item.id} photo={_item.director_detail.profile_image} director={_item.director_name} direction={_item.name} phone={_item.phone}></Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Dependencias;
