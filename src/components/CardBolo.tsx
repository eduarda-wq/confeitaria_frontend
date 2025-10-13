import { Link } from "react-router-dom"
import type { BoloType } from "../utils/BoloType"

export function CardBolo({ data }: { data: BoloType }) {
    return (
        <div className="max-w-sm bg-stone-100 border border-stone-300 rounded-lg shadow-sm dark:bg-stone-800 dark:border-stone-700">
            <img className="rounded-t-lg w-full h-56 object-cover" src={data.foto} alt={`Foto do ${data.nome}`} />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
                    {data.nome}
                </h5>
                <p className="mb-3 font-extrabold text-stone-700 dark:text-stone-200">
                    Preço R$: {Number(data.preco).toLocaleString("pt-br", {
                        minimumFractionDigits: 2
                    })}
                </p>
                <p className="mb-3 font-normal text-stone-600 dark:text-stone-400">
                    Categoria: {data.categoria.nome}
                </p>
                <Link to={`/detalhes/${data.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-stone-700 rounded-lg hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
                    Ver Detalhes
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}