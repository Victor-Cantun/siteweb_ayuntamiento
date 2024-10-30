import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import "../styles/style_carousel.css";

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000); // Cambia de imagen cada 3 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [currentIndex]);

  return (
    <>
      <div className="carousel-main w-screen h-screen bg-slate-100">
        <button onClick={goToPrevious} className="carousel-button prev">
          ◀
        </button>
        <div className="carousel-image-container w-full h-[95vh]">{data.length > 0 && <img src={api + data[currentIndex].image} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />}</div>
        <button onClick={goToNext} className="carousel-button next">
          ▶
        </button>
      </div>
    </>
  );
};
export default CarouselMain;
