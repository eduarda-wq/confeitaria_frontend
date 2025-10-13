import type { BoloType } from "./utils/BoloType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUsuarioStore } from "./context/UsuarioContext"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    quantidade: number,
    observacoes: string
}

export default function Detalhes() {
    const params = useParams()
    const { boloId } = params;

    const [bolo, setBolo] = useState<BoloType>()
    const { usuario } = useUsuarioStore()

    const { register, handleSubmit, reset } = useForm<Inputs>()

    useEffect(() => {
        async function buscaDados() {
            try {
                const response = await fetch(`${apiUrl}/bolos/${boloId}`)
                if (response.ok) {
                    const dados = await response.json()
                    setBolo(dados)
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes do bolo:", error)
                toast.error("Não foi possível carregar os detalhes do bolo.")
            }
        }
        buscaDados()
    }, [boloId])

    async function fazPedido(data: Inputs) {
        try {
            const response = await fetch(`${apiUrl}/pedidos`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    usuarioId: usuario.id,
                    boloId: Number(boloId),
                    quantidade: Number(data.quantidade),
                    observacoes: data.observacoes
                })
            })

            if (response.status === 201) {
                toast.success("Seu pedido foi realizado com sucesso!")
                reset()
            } else {
                const erroData = await response.json();
                toast.error(erroData.erro || "Erro... Não foi possível realizar seu pedido.")
            }
        } catch (error) {
            toast.error("Erro de conexão. Tente novamente.")
        }
    }

    if (!bolo) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl dark:text-white">Carregando detalhes do bolo...</p>
            </div>
        )
    }

    return (
        <section className="flex mt-6 mx-auto flex-col items-center bg-stone-100 border border-stone-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-2/4 md:rounded-none md:rounded-s-lg"
                src={bolo.foto} alt={`Foto do ${bolo.nome}`} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
                    {bolo.nome}
                </h5>
                <h6 className="mb-2 text-lg tracking-tight text-stone-600 dark:text-stone-300">
                    Categoria: {bolo.categoria.nome}
                </h6>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-900 dark:text-amber-500">
                    R$ {Number(bolo.preco)
                        .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
                </h5>
                <p className="mb-3 font-normal text-stone-700 dark:text-stone-400">
                    <b>Ingredientes:</b> {bolo.ingredientes}
                </p>

                {usuario.id ?
                    <>
                        <h3 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white mt-4">
                            Faça seu pedido! 🍰
                        </h3>
                        <form onSubmit={handleSubmit(fazPedido)} className="mt-2">
                            <div>
                                <label htmlFor="quantidade" className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">Quantidade</label>
                                <input type="number" id="quantidade"
                                    className="bg-stone-50 border border-stone-300 text-stone-900 rounded-lg focus:ring-amber-800 focus:border-amber-800 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-700 dark:focus:border-amber-700"
                                    defaultValue={1}
                                    min={1}
                                    required
                                    {...register("quantidade")} />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="observacoes" className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">Observações (opcional)</label>
                                <textarea id="observacoes" rows={3} className="block p-2.5 w-full text-sm text-stone-900 bg-stone-50 rounded-lg border border-stone-300 focus:ring-amber-800 focus:border-amber-800 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-700 dark:focus:border-amber-700"
                                    placeholder="Ex: Sem nozes, por favor."
                                    {...register("observacoes")}>
                                </textarea>
                            </div>
                            <button type="submit" className="mt-4 text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
                                Confirmar Pedido
                            </button>
                        </form>
                    </>
                    :
                    <h2 className="mb-2 mt-4 text-xl tracking-tight text-stone-900 dark:text-white">
                        Gostou? <Link to="/login" className="font-bold text-amber-700 hover:underline dark:text-amber-600">Identifique-se</Link> para fazer um pedido!
                    </h2>
                }
            </div>
        </section>
    )
}