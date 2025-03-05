import React, { useEffect, useState, useRef } from "react"
import About from "../About";
import Featured from "../Featured";
import Footer from "../Footer";
import Gallery from "../Gallery";
import Header from "../Header";
import Navbar from "../Navbar";
import useLocoScroll from "@/hooks/useLocoScroll";


export default function Example(){
    const [preloader, setPreloader]=useState(false);
    useLocoScroll(!preloader);
    const [timer, setTimer] = useState(3);
    const id = useRef(null);
    const clear = () => {
        window.clearInterval(id.current);
        setPreloader(false);
    };
    useEffect(()=>{
        id.current = window.setInterval(()=>{
            setTimer((timer)=> timer-1);
        },1000);
    },[]);
    useEffect(()=>{
        if(timer === 0){
            clear();
        }
    },[timer]);

    return (<>
    {preloader ? (<div className="loader-wrapper absolute">
        <h1>Victor</h1>
        <h2>Cantun</h2>
    </div> ):(
              <div className="main-container" id="main-container" data-scroll-container >
              <Navbar></Navbar>
              <Header ></Header>
              <Featured ></Featured>
              <About ></About>
              <Gallery ></Gallery>
              <Footer ></Footer>
          </div>
    )

    }
    </>);
}