import React, { useEffect, useRef } from "react"
import "./style.css"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header(){
    const containerRef = useRef(null);
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "center center",
                  end: "bottom 20%",
                  scrub: 1, // Suaviza la animación al hacer scroll
                  markers: true, // Muestra marcas de depuración
                },
              });
              tl.to(".titulo", { opacity: 1, x: 200, duration: 3.5 })
        },

      );
    useEffect(() => {

    },[]);
    return <section ref={containerRef}  className={"header-container"} data-scroll-section>
        <ul className="header-menu">
            <li>Intro</li>
            <li>About</li>
            <li>Featured</li>
        </ul>
        <h1 id="header-text" className="titulo" >Art objects</h1>
    </section>;
}