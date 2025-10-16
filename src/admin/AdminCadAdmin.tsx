// File: confeitaria_frontend/src/admin/AdminCadAdmin.tsx

import { useEffect, useState } from "react"

import ItemAdmin from "./components/ItemAdmin"
import { Link } from "react-router-dom"
import type { AdminType } from "../utils/AdminType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminCadAdmin() {
  const [admins, setAdmins] = useState<AdminType[]>([])

  useEffect(() => {
    async function getAdmins() {
      const response = await fetch(`${apiUrl}/admins`)
      const dados = await response.json()
      setAdmins(dados)
    }
    getAdmins()
  }, [])

  const listaAdmins = admins.map(admin => (
    <ItemAdmin key={admin.id} adminLinha={admin} admins={admins} setAdmins={setAdmins} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        {/* Título com cor de texto em tom de chocolate */}
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-amber-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Administradores do Sistema
        </h1>
        {/* Botão de Novo Admin com cor de chocolate vibrante (amber-800) */}
        <Link to="/admin/cadAdmin/novo" 
          className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:ring-amber-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-amber-700 dark:hover:bg-amber-800 focus:outline-none dark:focus:ring-amber-800">
          Novo Admin
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* Cabeçalho da tabela com fundo em tom de creme/bege vibrante */}
          <thead className="text-xs text-amber-900 uppercase bg-amber-200 dark:bg-stone-700 dark:text-stone-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome do Admin
              </th>
              <th scope="col" className="px-6 py-3">
                E-mail
              </th>
              <th scope="col" className="px-6 py-3">
                Nível
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaAdmins}
          </tbody>
        </table>
      </div>
    </div>
  )
}