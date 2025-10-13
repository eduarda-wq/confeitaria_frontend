import './MinhasPropostas.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { PedidoType } from "./utils/PedidoType";

const apiUrl = import.meta.env.VITE_API_URL

export default function MeusPedidos() {
    const [pedidos, setPedidos] = useState<PedidoType[]>([])
    const { cliente } = useClienteStore()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${apiUrl}/pedidos/${cliente.id}`)
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

    const pedidosTable = pedidos.map(pedido => (
        <tr key={pedido.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <p><b>{pedido.bolo.nome}</b></p>
                <p className='mt-3'>
                    R$: {Number(pedido.bolo.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                </p>
            </th>
            <td className="px-6 py-4">
                <img src={pedido.bolo.foto} className="fotoCarro" alt="Foto Bolo" />
            </td>
            <td className="px-6 py-4">
                <p><b>Quantidade:</b> {pedido.quantidade}</p>
                <p><b>Observação:</b> {pedido.observacao || "Nenhuma"}</p>
                <p className='mt-2'><i>Pedido em: {dataFormatada(pedido.createdAt)}</i></p>
            </td>
            <td className="px-6 py-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {pedido.status}
                </span>
            </td>
        </tr>
    ))

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                Listagem de <span className="underline underline-offset-3 decoration-8 decoration-pink-400 dark:decoration-pink-600">Meus Pedidos</span></h1>

            {pedidos.length === 0 ?
                <h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
                   &nbsp;&nbsp; Você ainda não fez nenhum pedido. 🍰
                </h2>
                :
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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