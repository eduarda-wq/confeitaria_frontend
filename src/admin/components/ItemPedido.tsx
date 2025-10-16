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

    if (novoStatus === "CLIENTE_RECEBEU") {
        alert("Erro... O status 'CLIENTE_RECEBEU' só pode ser alterado pelo cliente.");
        e.currentTarget.value = pedido.status; // Reverter a seleção
        return;
    }
    
    // VERIFICAÇÃO DE SEGURANÇA: Garante que o token exista
    if (!admin.token) {
        alert("Erro de autenticação: Token não encontrado.");
        e.currentTarget.value = pedido.status;
        return;
    }

    const response = await fetch(`${apiUrl}/pedidos/${pedido.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        // ESSENCIAL: Enviar o token no cabeçalho Authorization
        Authorization: `Bearer ${admin.token}` 
      },
      body: JSON.stringify({ status: novoStatus })
    })

    if (response.status === 200) {
      setPedidos(pedidos.map(p => p.id === pedido.id ? { ...p, status: novoStatus } : p))
      // Opcional: Adicionar um toast de sucesso aqui
    } else {
      alert("Erro ao atualizar o status do pedido. Verifique suas permissões ou o servidor.");
    }
  }

  // Corrigindo para usar createdAt, pois dataEntrega não está no tipo PedidoType original
  const dataFormatada = new Date(pedido.createdAt).toLocaleDateString("pt-BR", { timeZone: 'UTC' }) 
  
  // Usando a paleta amber para os estilos de status e select (coerência com o tema)
  return (
    <tr key={pedido.id} className="odd:bg-white odd:dark:bg-stone-900 even:bg-amber-50 even:dark:bg-stone-800 border-b dark:border-stone-700">
      <td className="px-6 py-4">
        <img src={pedido.bolo.foto} alt="Foto do Bolo" className="rounded" style={{ width: 50 }} />
        <p className="font-semibold text-amber-900">{pedido.bolo.nome}</p>
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
        {/* Status Tag - Estilização simples, pode ser refinada por status */}
        <span className="bg-amber-200 text-amber-900 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-amber-900 dark:text-amber-300">
          {pedido.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {/* Select de Status - Estilizado com cores amber */}
        <select onChange={alterarStatus} defaultValue={pedido.status} 
                className="bg-amber-100 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5">
            <option value="RECEBIDO">Recebido</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="FEITO">Feito</option>
            <option value="ENVIADO">Enviado</option>
            <option value="CANCELADO">Cancelado</option>
        </select>
      </td>
    </tr>
  )
}