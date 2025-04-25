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
    <section id="Dependencias"  className="h-dvh bg-slate-300 pt-[7%]">
      <div className="mx-4 flex flex-col py-[2%]">
        <div className="w-full flex justify-center">
          <h2  className=" text-xl font-bold tracking-tight text-cherry py-3">DEPENDENCIAS</h2>
        </div>
        <div className="w-full py-1 bg-pink">

          <div className="flex justify-center ">
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
                <div key={index}  class="flex flex-col bg-cherry shadow-sm border border-slate-200 rounded-lg my-6 w-64">
                  <div class="mx-2.5 my-2 overflow-hidden rounded-md h-80 flex justify-center items-center">
{/*                     <img class="w-full h-full object-cover" src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" /> */}
                    {item.director_detail != null ? (<img src={api + item.director_detail.profile_image} className="w-full h-full object-cover" alt="profile-picture" />) : (<i></i>)}
                  </div>
                  <div class="px-6 py-2 text-center">
                    <h4 class="mb-2 text-sm font-semibold text-white">
                    {item.director_name}
                    </h4>
                    <p
                      class="text-xs mb-2 font-semibold text-slate-300 uppercase">
                      {item.name} 
                    </p>
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
