import React from 'react'

const Presidente = () => {
  return (
    <>
        <div className="flex flex-col items-center justify-center w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
            <img className="w-32 h-32 p-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="/presidente.jpg" alt="Bordered avatar" />
            <p className="p-1 mt-1 text-base leading-3 text-gray-600">Lic. Juan Carlos Hernández Rath</p>
            <p className="p-1 text-lg font-bold tracking-tight text-cherry sm:text-lg">PRESIDENTE MUNICIPAL</p>
            <a href="https://www.facebook.com/juancarloshrathmx" className="text-sm">
            <svg className="h-5 w-5 pt-1 inline-block  align-top fill-black" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title>
                <path className="fill-black" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
            </svg></a>
        </div>
    </>
  )
}
export default Presidente;
