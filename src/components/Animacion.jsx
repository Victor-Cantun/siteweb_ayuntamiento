import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/style_gsap.css";
gsap.registerPlugin(ScrollTrigger);
export const Animacion = () => {
  const container = useRef();
  useGSAP(
    () => {
      gsap.from(".box", {
        scrollTrigger: {
          trigger: ".box",
          scrub: true,
          start: "top bottom",
          end: "bottom 20%",
          markers: true,
        },
        x: 200,
        //scaleX: 0,
        //transformOrigin: "left center",
        //ease: "none",
      });
      gsap.from(".line", {
        scrollTrigger: {
          trigger: ".line",
          scrub: true,
          start: "top bottom",
          end: "bottom 20%",
          markers: true,
        },
        scaleX: 0,
        transformOrigin: "left center",
        ease: "none",
      });
    },
    { scope: container }
  );
  /*   useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".prueba",
        start: "center center",
        end: "+=300",
        pin: true,
        markers: true,
      });
    },
    { scope: container }
  ); */

  /*   const timeline = gsap.timeline({ defaults: { opacity: 0, y: 50, duration: 1 } });
  useEffect(() => {
    const texto = document.querySelector("#texto");
    const imagen = document.querySelector(".imagen");
    timeline.from(texto, { x: 50, stagger: 0.5 }).from(imagen, { x: -50, stagger: 0.5 }, "+=0.5");
  }, []); */
  return (
    <>
      <div className="App">
        <div className="h-[100vh]"></div>
        <div className="container pt-[200px] " ref={container}>
          {/*           <div className="prueba">
            <h1 className="texto" id="texto">
              TEXTO
            </h1>
            <img src="/auditorio.jpeg" className="imagen" id="imagen" />
          </div> */}
          <div className="left">
            <span className="line line-1"></span>
          </div>
          <div className="right">
            <div className="box"></div>
          </div>
        </div>
      </div>
    </>
  );
};
