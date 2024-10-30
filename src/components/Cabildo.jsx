import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import Card from "./CardCabildo.jsx";
const Cabildo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listCouncil`);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);
  return (
    <>
      <section id="Cabildo" className="bg-white pt-[4%] pb-[4%]">
        <div className=" ml-[2%] mr-[2%] w-auto pt-[2%] pb-[2%] ">
          <div className="mx-auto grid   xl:grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <img className="w-32 h-32 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="/presidente.jpg" alt="Bordered avatar" />
              <p className="text-lg font-bold tracking-tight text-cherry sm:text-lg">PRESIDENTE MUNICIPAL</p>
              <p className="mt-1 text-base leading-3 text-gray-600">Lic. Juan Carlos H. Rath</p>
            </div>
            <div className="gap-x-8 gap-y-12 xl:col-span-2">
              <div className="w-full flex justify-center">
                <h2 className=" text-xl font-bold tracking-tight text-cherry py-3">CABILDO</h2>
              </div>
              <div className="mx-auto grid w-auto max-w-7xl gap-x-2 gap-y-10 px-6 lg:px-8 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 ">
                {data.map(_item => (
                  <Card key={_item.id} photo={_item.profile_image} position={_item.position_name} name={_item.name + " " + _item.firstlastname + " " + _item.secondlastname} phone={_item.phone}></Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Cabildo;
