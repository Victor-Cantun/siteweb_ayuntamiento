import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import "../styles/style_carousel.css";
import { Carousel } from "flowbite-react";

const CarouselMain = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`${api}/listCarousel`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  };


  return (
    <>
      <div className="relative h-screen">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-cherry">
          <div className="grid h-full place-items-center">

          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <Carousel slideInterval={5000} className="h-96 w-[90%] z-20">
              {data.map((item,index)=>(
                <img key={index} src={api+item.image} alt={index} />
              ))}
            </Carousel>
        </div>
      </div>
    </>

  );
};
export default CarouselMain;

