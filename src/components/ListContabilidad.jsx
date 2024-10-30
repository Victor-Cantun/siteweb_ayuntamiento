import React from "react";
import { api } from "../api/api.js";
const ListContabilidad = ({ link, title }) => {
  return (
    <>
      <li class="p-2 hover:bg-gray-50 cursor-pointer">
        <p class="text-lg font-medium leading-loose pl-4">
          <a href={api + link}>{title}</a>
        </p>
      </li>
    </>
  );
};
export default ListContabilidad;
