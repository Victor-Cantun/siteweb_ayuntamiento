import React, { useState, useEffect } from "react";
import { api } from "../api/api.js";
import List from "./ListContabilidad.astro";
const Header = title => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api}/listAccounting`);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  // Definimos el estado para controlar la visibilidad del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para manejar el clic en el botón de abrir menú
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Cambiamos el estado para mostrar u ocultar el menú
  };

  return (
    <>
      <header className="bg-white border-b-8 border-golden w-full fixed z-50" id="header">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1 p-1">
              <span className="sr-only">H. Ayuntamiento de Escárcega</span>
              <img className="h-[90px] w-[250px]" src="/logo-2.png" alt="" />
            </a>
          </div>
          <div className="flex">
            <button id="open_menu" onClick={handleMenuToggle} type="button" className="text_menu -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black lg:hidden">
              <span className="sr-only">Abrir menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="/" className="text_menu text-sm font-semibold leading-6 text-black">
              Inicio
            </a>
            <a href="#Cabildo" className="text_menu text-sm font-semibold leading-6 text-black">
              Cabildo
            </a>
            <a href="#Dependencias" className="text_menu text-sm font-semibold leading-6 text-black">
              Dependencias
            </a>
            <div className="relative">
              <button id="btn_transparencia" type="button" className="text_menu flex items-center gap-x-1 text-sm font-semibold leading-6 text-black" aria-expanded="false">
                Transparencia
                <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              <div id="menu_transparencia" className="absolute -left-8 top-full z-40 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 hidden ">
                <div className="mx-auto max-w-lg">
                  <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 shadow-sm">
                    <li class="p-2 hover:bg-gray-50 cursor-pointer">
                      <p class="text-lg font-medium leading-loose pl-4">
                        <a href="https://transparencia.escarcega.gob.mx/contabilidad/">Contabilidad Gubernamental</a>
                      </p>
                    </li>
                    <li class="p-2 hover:bg-gray-50 cursor-pointer">
                      <p class="text-lg font-medium leading-loose pl-4">
                        <a href="https://smdif.escarcega.gob.mx/contabilidad/">Contabilidad SMDIF</a>
                      </p>
                    </li>
                    <li class="p-2 hover:bg-gray-50 cursor-pointer">
                      <p class="text-lg font-medium leading-loose pl-4">
                        <a href="#">Contabilidad SMAPAE</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <a href="/blog" className="text_menu text-sm font-semibold leading-6 text-black">
              Blog
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>

        <div id="movil_menu" className={` ${isMenuOpen ? "" : "lg:hidden md:hidden hidden"}`} role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="z-40 fixed inset-y-0 right-0 w-full overflow-y-auto px-6 py-6 sm:max-w-sm bg-cherry border-b-8 border-golden">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">H. Ayuntamiento de Escárcega</span>
                <img className="h-8 w-auto" src="/logo-1.png" alt="" />
              </a>
              <button id="close_menu" onClick={handleMenuToggle} type="button" className="-m-2.5 rounded-md p-2.5 text-white">
                <span className="sr-only">Cerrar menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root ">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a href="/" id="btn-movil_inicio" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black">
                    Inicio
                  </a>
                  <a href="#" id="#Cabildo" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black">
                    Cabildo
                  </a>
                  <a href="#" id="Dependencias" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black">
                    Dependencias
                  </a>

                  <div className="-mx-3">
                    <button
                      id="btn-movil_transparencia"
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                    >
                      Transparencia
                      <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div className="mt-2 space-y-2 hidden" id="menu-movil_gaceta">
                      <a
                        href="https://transparencia.escarcega.gob.mx/contabilidad/"
                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black"
                      >
                        Contabilidad Gubernamental
                      </a>
                      <a href="https://smdif.escarcega.gob.mx/contabilidad/" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black">
                        Contabilidad SMDIF
                      </a>
                      <a href="#" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black">
                        Contabilidad SMAPAE
                      </a>
                    </div>
                  </div>
                  <a href="/blog" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black">
                    Blog
                  </a>
                </div>
                <div className="py-6"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
