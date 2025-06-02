import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import { Accordion } from "flowbite-react";
import GacetaComponent from '../components/GacetaComponent.jsx'
const Gaceta = () => {
const [data, setData] = useState([]);
const [years, setYears] = useState([]);
  useEffect(() => {
    LoadYears()
    LoadList()
  }, []);
  const LoadList = async() => {
    const response = await fetch(`${api}/listGazette`);
    const result = await response.json();
    //console.log(result);
    setData(result);
  }
  const LoadYears = async() => {
    const response = await fetch(`${api}/listYears`);
    const result = await response.json();
    //console.log(result);
    setYears(result);
  }

  const handleChange = (event) => {
    const year = event.target.value;
    console.log(year)
    fetchData(year);
    async function fetchData() {
        const response = await fetch(`${api}/listGazette?year=${year}`);
        const result = await response.json();
        console.log(result)
        setData(result);
    }
  };

    return (
        <>
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white uppercase">Gaceta municipal</h2>
            <Accordion collapseAll  className="w-full">
            {years.map((item,index)=>(
            <Accordion.Panel key={index}>
                <Accordion.Title className="bg-cherry text-white hover:bg-red-900">{item.year}</Accordion.Title>
                <Accordion.Content>
                    <GacetaComponent year={item.year}></GacetaComponent>
                </Accordion.Content>
            </Accordion.Panel>
            ))}
            </Accordion>
        </>
    );
};
export default Gaceta;
