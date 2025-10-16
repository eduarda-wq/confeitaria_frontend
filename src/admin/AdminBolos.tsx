// File: confeitaria_frontend/src/admin/AdminBolos.tsx

import { useEffect, useState } from "react"
import ItemBolo from './components/ItemBolo'
import type { BoloType } from "../utils/BoloType"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminBolos() {
  const [bolos, setBolos] = useState<BoloType[]>([])

  useEffect(() => {
    async function getBolos() {
      const response = await fetch(`${apiUrl}/bolos`)
      const dados = await response.json()
      setBolos(dados)
    }
    getBolos()
  }, [])

  const listaBolos = bolos.map(bolo => (
    <ItemBolo key={bolo.id} bolo={bolo} bolos={bolos} setBolos={setBolos} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        {/* Título com cor de texto em tom de chocolate (amber-900) */}
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-amber-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Bolos
        </h1>
        {/* Botão "Novo Bolo" com cor de chocolate vibrante (amber-800) */}
        <Link to="/admin/bolos/novo" 
          className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:ring-amber-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-amber-700 dark:hover:bg-amber-800 focus:outline-none dark:focus:ring-amber-800">
          Novo Bolo
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* Cabeçalho da tabela com fundo em tom de creme/bege vibrante e texto em chocolate */}
          <thead className="text-xs text-amber-900 uppercase bg-amber-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do Bolo
              </th>
              <th scope="col" className="px-6 py-3">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaBolos}
          </tbody>
        </table>
      </div>
    </div>
  )
}