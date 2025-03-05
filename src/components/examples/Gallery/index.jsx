import React, { useState } from "react"
import images from "./data.js";
import "./style.css"

function GalleryItem({src,category,title,subtitle,updateActiveImage, index}){
    return(
        <>
            <div className="gallery-item-wrapper" data-scroll-section>
                <div/>
                    <div className="gallery-item">
                        <div className="gallery-item-info">
                            <h1 className="gallery-info-title">{title}</h1>
                            <h2 className="gallery-info-subitle">{subtitle}</h2>
                            <p className="gallery-info-category">{category}</p>
                        </div>
                        <div className="gallery-item-image" style={{backgroundImage:`url(${src})`}}>

                        </div>
                    </div>
                <div/>
            </div>
        </>

        
    );
}
export default function Gallery(){
    const [activeImage, setActiveImage] = useState(1);
    return <section className={"section-wrapper gallery-wrap"} >
        <div className="gallery">
            <div className="gallery-counter">
                <span>{activeImage}</span>
                <span className="divider"></span>
                <span>{images.length}</span>
            </div>
            {images.map((image, index)=>(
                <GalleryItem key={index} index={index}{...image} updateActiveImage={(index)=>setActiveImage(index+1)}></GalleryItem>))}
        </div>
    </section>;
}