import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { BoloType } from "../utils/BoloType";

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
    termo: string
}

type InputPesquisaProps = {
    setBolos: React.Dispatch<React.SetStateAction<BoloType[]>>
}

export function InputPesquisa({ setBolos }: InputPesquisaProps) {
    const { register, handleSubmit, reset } = useForm<Inputs>()

    async function enviaPesquisa(data: Inputs) {
        if (data.termo.length < 2) {
            toast.error("Informe, no mínimo, 2 caracteres")
            return
        }

        const response = await fetch(`${apiUrl}/bolos/pesquisa/${data.termo}`)
        const dados = await response.json()
        setBolos(dados)
    }

    async function mostraTodos() {
        const response = await fetch(`${apiUrl}/bolos`)
        const dados = await response.json()
        reset({ termo: "" })
        setBolos(dados)
    }

    return (
        <div className="flex mx-auto max-w-5xl mt-3">
            <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisar</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-stone-900 border border-stone-300 rounded-lg bg-stone-50 focus:ring-amber-800 focus:border-amber-800 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-700 dark:focus:border-amber-700"
                        placeholder="Pesquise por nome, categoria ou preço" required
                        {...register('termo')} />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
                        Pesquisar
                    </button>
                </div>
            </form>
            <button type="button" className="ms-3 mt-2 focus:outline-none text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-amber-700 dark:hover:bg-amber-800 dark:focus:ring-amber-900"
                onClick={mostraTodos}>
                Ver Todos
            </button>
        </div>
    )
}