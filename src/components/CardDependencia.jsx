import React from "react";
import { api } from "../api/api.js";

const CardDependencia = ({ photo, director, direction, phone }) => {
  return (
    <>
      <div className="bg-white grid relative shadow rounded overflow-hidden before:absolute before:bg-verde before:w-[5px] before:h-[400px] before:z-0 before:transition-all hover:before:w-full hover:before:h-full after:absolute after:inset-[5px] after:z-0 after:bg-white">
        <div className="flex flex-wrap justify-center items-center  px-1 py-2 z-10">
          <div className="flex justify-center w-full md:w-1/4 lg:w-1/4">
            <img className="h-16 w-16 rounded-full " src={api + photo} alt="" />
          </div>
          <div className="w-full  md:w-3/4 lg:w-3/4 px-2 flex flex-col items-center justify-center md:items-start">
            <h3 className="text-xm leading-6 text-gray-800">{director}</h3>
            <strong><p className="text-xs text-cherry text-center md:text-left">{direction}</p></strong>
            <p className="text-xs md:text-sm leading-6 text-gray-700"> {phone}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardDependencia;
