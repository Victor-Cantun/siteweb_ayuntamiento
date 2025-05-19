import React, { useState, useEffect } from "react";
const Trimestre = ({key,api,document,trimestre}) => {
const class_active = 'text-blue-600 border bg-blue-50 hover:bg-blue-100 hover:text-blue-700';
const class_inactive = 'text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700';
const renderItem = (item) => {
  switch (item.type) {
    case 'text':
      return <p key={item.id}>{item.content}</p>;
    case 'image':
      return <img key={item.id} src={item.content} alt="Imagen" />;
    case 'video':
      return (
        <video key={item.id} controls width="300">
          <source src={item.content} type="video/mp4" />
        </video>
      );
    default:
      return <div key={item.id}>Tipo desconocido</div>;
  }
};

return (
  <div>
    {items.map(renderItem)}
  </div>
);

}
export default Trimestre;