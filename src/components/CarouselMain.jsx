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
    <div className="">
      <div className="h-dvh sm:h-dvh xl:h-dvh 2xl:h-dvh bg-cherry">
        <Carousel slideInterval={5000}>
          {data.map((item,index)=>(
            <img src={api+item.image} alt={index} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default CarouselMain;

