"use client";
import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import { Button, Modal } from "flowbite-react";
//import DependencesComponent from '../components/Dependences.jsx'
export default function  ObligationComponent  () {
  const [data, setData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [obligationSelect, setObligationSelect] = useState('');
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listCommonObligations`);
      const result = await response.json();

      setData(result);
    }
    fetchData();
  }, []);

  const loadList = (obligation)=>{
    console.log("el id es:",obligation)
    //const obligation = obligation;
    setObligationSelect(obligation)
    async function getDocuments(){
        const response = await fetch(`${api}/listCommonObligationsDocuments/${obligation.id}`);
        const result = await response.json();
        setDocuments(result);
        console.log(documents)
    }
    getDocuments();
  }

  const aplica = <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-700">
  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
    </svg>
    </p>;
  const no_aplica = <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-600">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
    </p>;

  return (
    <>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  ">
                <thead className="text-xs text-white uppercase bg-cherry dark:bg-gray-700 dark:text-gray-400   " >
                    <tr>
                        <th scope="col" className="rounded-tl-xl  px-6 py-3">
                            Fracciión
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Obligación
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Aplicabilidad
                        </th>
                        <th scope="col" className="rounded-tr-xl  px-6 py-3">
                            Periodicidad
                        </th>
                    </tr>
                </thead>
                <tbody className="border rounded-t-xl">
                    
                    {data.map((item,index)=>(
                        <tr  key={index} className="hover:bg-gray-50 cursor-pointer" onClick={()=>{loadList(item);setOpenModal(true);}}>
                            <td className="px-6 py-4"> {item.fraction}</td>
                            <td className="px-6 py-4"> {item.obligation}</td>
                            <td className="px-6 py-4"> 
                                {item.applicability ? aplica : no_aplica}
                            </td>
                            <td className="px-6 py-4"> {item.periodicity}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)} >
            <Modal.Header>{obligationSelect.obligation}</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  ">
                            <thead className="text-xs text-white uppercase bg-cherry dark:bg-gray-700 dark:text-gray-400   " >
                                <tr>
                                    <th scope="col" className="rounded-tl-xl  px-6 py-3">
                                        Año
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Documento
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Archivo
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="border rounded-t-xl">
                            {documents.map((item,index)=>(
                                <tr  key={index} className="hover:bg-gray-50 cursor-pointer" >
                                    <td className="px-6 py-4"> {item.year}</td>
                                    <td className="px-6 py-4"> {item.name}</td>
                                    <td className="px-6 py-4">
                                        <a href={api+item.document} target="_blank">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                                        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                        </svg>

                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};


