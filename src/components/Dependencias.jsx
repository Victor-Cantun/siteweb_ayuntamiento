import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import Card from "./CardDependencia.jsx";

import { EffectCoverflow,Navigation, Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/style_swiper.css'

const Dependencias = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/PublicListDependences`);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);
  return (
    <section id="Dependencias"  className=" bg-slate-200 pt-[7%]">
      <div className=" mx-auto flex flex-col max-w-7xl  py-[2%]">
        <div className="w-full flex justify-center">
          <h2  className=" text-xl font-bold tracking-tight text-cherry py-3">DEPENDENCIAS</h2>
        </div>
        <div className="w-full py-1">

          <div className="w-3/4 m-auto">
            <div className="container">
            {/* <h1 className="heading">DEPENDENCIAS</h1> */}
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="swiper_container"
            >
            {data.map((item,index)=>(
              <>
              <SwiperSlide>
                <div key={index} className="bg-white text-black rounded-xl myCard border border-gray-200 shadow-sm">
                  <div className="h-44 bg-cherry flex justify-center items-center rounded-t-xl">
                    {item.director_detail != null ? (<img src={api + item.director_detail.profile_image} className="rounded-full w-40 h-40" />) : (<i></i>)}
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 p-4">
                    <p className="text-center text-sm font-light text-stone-800">{item.director_name}</p>
                    <p className="text-center text-sm font-medium text-red-800">{item.name}</p>
                  </div>
                </div>
              </SwiperSlide>
              </>
              ))}
              <div className="slider-controler">
                <div className="swiper-button-prev slider-arrow">
                </div>
                <div className="swiper-button-next slider-arrow">
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Dependencias;
