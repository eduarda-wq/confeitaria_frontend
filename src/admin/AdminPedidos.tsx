import { useEffect, useState } from "react"
import type { PedidoType } from "../utils/PedidoType"
import ItemPedido from "./components/ItemPedido"

const apiUrl = import.meta.env.VITE_API_URL

function AdminPedidos() {
  const [pedidos, setPedidos] = useState<PedidoType[]>([])

  useEffect(() => {
    async function getPedidos() {
      const response = await fetch(`${apiUrl}/pedidos`)
      const dados = await response.json()
      setPedidos(dados)
    }
    getPedidos()
  }, [])

  const listaPedidos = pedidos.map(pedido => (
    <ItemPedido key={pedido.id} pedido={pedido} pedidos={pedidos} setPedidos={setPedidos} />
  ))

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Pedidos
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Bolo
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Detalhes do Pedido
              </th>
              <th scope="col" className="px-6 py-3">
                Data Entrega
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaPedidos}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPedidos