import React from 'react'
import ComponentDocument from '../components/Documentos.jsx'

import { api } from '../api/api.js';
 const subgrupo = ({name, documents}) => {
  return (
    <>
        <p class="mb-2 text-gray-500 dark:text-gray-400">{name}</p>
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
        {documents.map(item=>(
            <>

                <li>
                <a href={api+item.document} target="_blank" aria-current="page" className="flex items-center justify-center px-4 h-10 bg-blue-50 text-blue-600 hover:text-blue-700  border border-gray-300  hover:bg-blue-100  dark:border-gray-700 dark:bg-gray-700 dark:text-white">{item.quarterly}</a>
                </li>

            </>
        ))}
            </ul>
        </nav> 
    </>

  )
}
export default subgrupo;