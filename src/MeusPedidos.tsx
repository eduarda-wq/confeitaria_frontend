import './MeusPedidos.css'
import { useEffect, useState } from "react";
import { useUsuarioStore } from "./context/UsuarioContext";
import type { PedidoType } from "./utils/PedidoType";

const apiUrl = import.meta.env.VITE_API_URL

export default function MeusPedidos() {
    const [pedidos, setPedidos] = useState<PedidoType[]>([])
    const { usuario } = useUsuarioStore()

    useEffect(() => {
        if (!usuario.id) return;

        async function buscaDados() {
            try {
                const response = await fetch(`${apiUrl}/pedidos/usuario/${usuario.id}`)
                if (response.ok) {
                    const dados = await response.json()
                    setPedidos(dados)
                }
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error)
            }
        }
        buscaDados()
    }, [usuario.id])

    function formataDataHora(data: string) {
        return new Date(data).toLocaleString('pt-BR');
    }

    function getStatusBadge(status: PedidoType['status']) {
        const styles = {
            PENDENTE: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            EM_PREPARO: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            CONCLUIDO: 'bg-cyan-200 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
            ENTREGUE: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300',
            CANCELADO: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300',
        };
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}>
                {status.replace('_', ' ')}
            </span>
        );
    }

    const pedidosTable = pedidos.map(pedido => (
        <tr key={pedido.id} className="bg-white border-b dark:bg-stone-800 dark:border-stone-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <p><b>{pedido.bolo.nome}</b></p>
                <p className='mt-3'>
                    Preço Unit.: R$ {Number(pedido.bolo.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                </p>
            </th>
            <td className="px-6 py-4">
                <img src={pedido.bolo.foto} className="fotoBolo" alt={`Foto do ${pedido.bolo.nome}`} />
            </td>
            <td className="px-6 py-4">
                <p><b>Quantidade:</b> {pedido.quantidade}</p>
                <p><b>Valor Total:</b> R$ {Number(pedido.valor_total).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
                {pedido.observacoes && <p className='mt-2'><b>Obs:</b> <i>{pedido.observacoes}</i></p>}
                <p className='mt-2'><i>Pedido em: {formataDataHora(pedido.createdAt)}</i></p>
            </td>
            <td className="px-6 py-4">
                {getStatusBadge(pedido.status)}
            </td>
        </tr>
    ))

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                Listagem de <span className="underline underline-offset-3 decoration-8 decoration-amber-700 dark:decoration-amber-600">Meus Pedidos</span></h1>

            {pedidos.length === 0 ?
                <h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
                    &nbsp;&nbsp; Você ainda não fez nenhum pedido. 🧁
                </h2>
                :
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-stone-700 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Bolo</th>
                                <th scope="col" className="px-6 py-3">Foto</th>
                                <th scope="col" className="px-6 py-3">Detalhes do Pedido</th>
                                <th scope="col" className="px-6 py-3">Status</th>
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