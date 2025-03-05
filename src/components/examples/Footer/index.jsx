import React from "react"
import "./style.css"
import SectionHeader from "../SectionHeader";
export default function Footer(){
    return <section className={"footer"} data-scroll-section>
        <SectionHeader  title='Made in'>
            
        </SectionHeader>
        <h1 className="location" id="location-text">Rio de janeiro</h1>
    </section>;
}