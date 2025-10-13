import { FaRegEdit  } from "react-icons/fa"
import type { PedidoType } from "../../utils/PedidoType"
import { useAdminStore } from "../context/AdminContext"

type listaPedidoProps = {
  pedido: PedidoType,
  pedidos: PedidoType[],
  setPedidos: React.Dispatch<React.SetStateAction<PedidoType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemPedido({ pedido, pedidos, setPedidos }: listaPedidoProps) {
  const { admin } = useAdminStore()

  async function alterarStatus(e: React.FormEvent<HTMLSelectElement>) {
    const novoStatus = e.currentTarget.value

    const response = await fetch(`${apiUrl}/pedidos/${pedido.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${admin.token}`
      },
      body: JSON.stringify({ status: novoStatus })
    })

    if (response.status === 200) {
      setPedidos(pedidos.map(p => p.id === pedido.id ? { ...p, status: novoStatus } : p))
    } else {
      alert("Erro ao atualizar o status do pedido.")
    }
  }

  const dataFormatada = new Date(pedido.dataEntrega).toLocaleDateString("pt-BR", { timeZone: 'UTC' })

  return (
    <tr key={pedido.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        <img src={pedido.bolo.foto} alt="Foto do Bolo" style={{ width: 150 }} />
        <p className="font-semibold">{pedido.bolo.nome}</p>
      </td>
      <td className="px-6 py-4">
        {pedido.cliente.nome}
      </td>
      <td className="px-6 py-4">
        <p><b>Qtd:</b> {pedido.quantidade}</p>
        <p><b>Obs:</b> {pedido.observacao || "Nenhuma"}</p>
      </td>
      <td className="px-6 py-4">
        {dataFormatada}
      </td>
      <td className="px-6 py-4">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {pedido.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <select onChange={alterarStatus} defaultValue="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="" disabled>Alterar Status</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_PRODUCAO">Em Produção</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="ENTREGUE">Entregue</option>
            <option value="CANCELADO">Cancelado</option>
        </select>
      </td>
    </tr>
  )
}