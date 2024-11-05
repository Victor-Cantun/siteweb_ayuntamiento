import React, { useEffect, useRef } from "react";
//import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/style_cover.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
//COMPONENTES
import CarouselMain from "../components/CarouselMain";
import { Animacion } from "./Animacion";
gsap.registerPlugin(ScrollTrigger);

//gsap.registerPlugin(ScrollTrigger);
const Cover = () => {
  const panelsRef = useRef([]);

  useEffect(() => {
    //const panels = gsap.utils.toArray(".panel");
    const panels = gsap.utils.toArray(".panel");
    const tops = panels.map(panel =>
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
      })
    );

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () => (panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom"),
        pin: true,
        pinSpacing: false,
      });
    });

    ScrollTrigger.create({
      snap: {
        snapTo: (progress, self) => {
          const panelStarts = tops.map(st => st.start),
            snapScroll = gsap.utils.snap(panelStarts, self.scroll());
          return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
        },
        duration: 0.5,
      },
    });

    // Limpieza
  }, []);

  return (
    <>
      <div className="">
        <section ref={el => (panelsRef.current[0] = el)} className="panel blue bg-blue-500 w-full h-[100vh] grid place-items-center">
          <CarouselMain client:load></CarouselMain>
        </section>
        <section ref={el => (panelsRef.current[1] = el)} className="panel red bg-red-600 w-full h-[100vh] grid place-items-center">
          ONE
        </section>
        <section ref={el => (panelsRef.current[2] = el)} className="panel orange bg-orange-500 w-full h-[100vh] ">
          <Animacion client:load></Animacion>
        </section>
        <section ref={el => (panelsRef.current[3] = el)} className="panel purple bg-purple-600 w-full h-[100vh] grid place-items-center">
          THREE
        </section>
        <section ref={el => (panelsRef.current[4] = el)} className="panel green bg-green-400 w-full h-[100vh] grid place-items-center">
          FOUR
        </section>
      </div>
    </>
  );
};
export default Cover;
