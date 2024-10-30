import React from "react";
import { api } from "../api/api.js";
const CardCabildo = ({ photo, position, name, phone }) => {
  return (
    <>
      <div className="bg-white grid relative shadow rounded overflow-hidden before:absolute before:bg-verde before:w-[5px] before:h-[400px] before:z-0 before:transition-all hover:before:w-full hover:before:h-full after:absolute after:inset-[5px] after:z-0 after:bg-white">
        <div className="flex flex-wrap justify-center items-center  px-1 py-2 z-10">
          <div className="flex justify-center w-full md:w-1/3 lg:w-1/3">
            <img className="h-16 w-16 rounded-full " src={api + photo} alt="" />
          </div>
          <div className="w-full  md:w-2/3 lg:w-2/3 px-2">
            <h3 className="text-sm leading-7 tracking-tight text-gray-800">{name}</h3>
            <p className="text-sm font-semibold leading-6 text-cherry">{position}</p>
            <p className="text-sm  leading-6 text-gray-700"> {phone}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardCabildo;
