import React from 'react'
import ComponentSubgrupo from '../components/subgrupo.jsx'

const grupo = ({id,grupo, subgrupos}) => {
  return (
    <>
{subgrupos.map(item=>(
        <div id={'accordion-open-'+id} className="gap-1 p-2 bg-white" >
            <h2   id={'accordion-collapse-heading-'+id} >
                <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right border border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  gap-3 bg-cherry text-white" 
                data-accordion-target={'#accordion-open-body-'+id} aria-expanded="true" 
                aria-controls={'accordion-open-body-'+id}>
                <span class="flex items-center">{grupo}</span>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
                </button>
            </h2>
            <div id={'accordion-open-body-'+id} class="" aria-labelledby={'accordion-collapse-heading-'+id}>
                <div class="p-5 border  border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                     <ComponentSubgrupo name={item.name} documents={item.documentos} ></ComponentSubgrupo>
                </div>
            </div>
        </div>
))}
    </>
  )
}
export default grupo;