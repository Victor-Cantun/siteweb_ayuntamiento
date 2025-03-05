import React from "react"
import SectionHeader from "../SectionHeader";
import "./style.css"

export default function About(){
    return <section className={"about-section"} data-scroll-section>
        <SectionHeader title='about'></SectionHeader>
        <p id="headline">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque error, voluptas ea consectetur eligendi exercitationem velit in hic, porro itaque corrupti fugit molestiae quisquam quis cum. Quas excepturi commodi vel.
        </p>
    </section>;
}