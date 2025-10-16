// File: confeitaria_frontend/src/MeusPedidos.tsx

import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { PedidoType } from "./utils/PedidoType";
import { toast } from "sonner"; // Importar toast para mensagens

const apiUrl = import.meta.env.VITE_API_URL

export default function MeusPedidos() {
    const [pedidos, setPedidos] = useState<PedidoType[]>([])
    const { cliente } = useClienteStore()

    useEffect(() => {
        async function buscaDados() {
            // CORREÇÃO ESSENCIAL: A URL deve incluir /cliente/ antes do ID
            const response = await fetch(`${apiUrl}/pedidos/cliente/${cliente.id}`) 
            const dados = await response.json()
            setPedidos(dados)
        }
        if (cliente.id) {
            buscaDados()
        }
    }, [cliente])

    function dataFormatada(data: string) {
        const dataObj = new Date(data);
        return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(dataObj);
    }

    async function confirmaRecebimento(pedidoId: number) {
      if (!confirm("Confirma que você recebeu o pedido?")) return;

      const response = await fetch(`${apiUrl}/pedidos/recebido/${pedidoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clienteId: cliente.id })
      });

      if (response.ok) {
        toast.success("Recebimento confirmado! Obrigado pela preferência.");
        // Atualiza a lista de pedidos no estado local
        setPedidos(pedidos.map(p => p.id === pedidoId ? { ...p, status: "CLIENTE_RECEBEU" as PedidoType["status"] } : p));
      } else {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.erro || "Não foi possível confirmar o recebimento."}`);
      }
    }


    const pedidosTable = pedidos.map(pedido => (
        // Estilização: Sem fundo e com borda sutil
        <tr key={pedido.id} className="text-amber-900 border-b border-amber-300 dark:text-white dark:border-stone-700"> 
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-amber-900 dark:text-white">
                <p><b>{pedido.bolo.nome}</b></p>
                <p className='mt-3'>
                    R$: {Number(pedido.bolo.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                </p>
            </th>
            <td className="px-6 py-4">
                {/* Estilização da Imagem */}
                <img src={pedido.bolo.foto} className="fotoCarro rounded" alt="Foto Bolo" style={{ width: 100 }} />
            </td>
            <td className="px-6 py-4">
                <p><b>Quantidade:</b> {pedido.quantidade}</p>
                <p><b>Observação:</b> {pedido.observacao || "Nenhuma"}</p>
                <p className='mt-2'><i>Pedido em: {dataFormatada(pedido.createdAt)}</i></p>
            </td>
            <td className="px-6 py-4">
                {/* Status Tag - Usando tons de amber vibrante */}
                <span className="bg-amber-200 text-amber-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-amber-900 dark:text-amber-300">
                    {pedido.status}
                </span>
                {/* Botão de confirmação de recebimento */}
                {pedido.status === "ENVIADO" && (
                    <button
                        onClick={() => confirmaRecebimento(pedido.id)}
                        className="mt-2 text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:bg-amber-500 dark:hover:bg-amber-600"
                    >
                        Marcar como Recebido
                    </button>
                )}
            </td>
        </tr>
    ))

    return (
        <section className="max-w-7xl mx-auto">
            {/* Título com cor de chocolate vibrante */}
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-amber-900 md:text-4xl lg:text-5xl dark:text-white">
                Listagem de <span className="underline underline-offset-3 decoration-8 decoration-amber-400 dark:decoration-amber-600">Meus Pedidos</span></h1>

            {pedidos.length === 0 ?
                <h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-amber-900 dark:text-white">
                   &nbsp;&nbsp; Você ainda não fez nenhum pedido. 🍰
                </h2>
                :
                // REMOVIDO: shadow-md sm:rounded-lg do container principal para remover a borda
                <div className="relative overflow-x-auto"> 
                    <table className="w-full text-sm text-left rtl:text-right text-amber-900 dark:text-gray-400">
                        {/* Cabeçalho da tabela ajustado para o tema vibrante (Amber) */}
                        <thead className="text-xs uppercase bg-amber-200 text-amber-900 dark:bg-stone-700 dark:text-stone-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Bolo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Foto
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Detalhes do Pedido
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidosTable}
                        </tbody>
                    </table>
                </div>
            }
        </section>
    )
}