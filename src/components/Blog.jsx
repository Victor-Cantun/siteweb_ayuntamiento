import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import { Carousel } from "./CarouselCard.jsx";
import { TextCard } from "./TextCard.jsx";
const Blog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listPosts`);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
      {data.map(_item => (
        <div key={_item.id} className="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-2">
          <a href="#">
            <Carousel images={_item.images}></Carousel>
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-sm font-bold tracking-tight text-green-700 dark:text-white">{_item.title}</h5>
            </a>
            <TextCard text={_item.content}></TextCard>
            <p className="text-sm text-gray-400">{new Date(_item.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </>
  );
};
export default Blog;
