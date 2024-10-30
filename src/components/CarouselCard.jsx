import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import "../styles/style_carousel.css";

export const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className="carousel">
        <button onClick={goToPrevious} className="carousel-button prev">
          ◀
        </button>
        <div className="carousel-image-container">
          <img src={api + images[currentIndex].image} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
        </div>
        <button onClick={goToNext} className="carousel-button next">
          ▶
        </button>
      </div>
    </>
  );
};
