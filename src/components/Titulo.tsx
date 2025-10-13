import { Link, useNavigate } from "react-router-dom"
import { useUsuarioStore } from "../context/UsuarioContext"
import { toast } from "sonner"

export default function Titulo() {
    const { usuario, deslogaUsuario } = useUsuarioStore()
    const navigate = useNavigate()

    function usuarioSair() {
        toast.success("Logout efetuado com sucesso!")
        deslogaUsuario()
        if (localStorage.getItem("usuarioKey")) {
            localStorage.removeItem("usuarioKey")
        }
        navigate("/login")
    }

    return (
        <nav className="border-b border-stone-700 bg-stone-800 dark:bg-stone-900 dark:border-stone-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./bolo-logo.png" className="h-12" alt="Logo Bolo Bom" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-stone-100 dark:text-white">
                        Bolo Bom
                    </span>
                </Link>
                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Abrir menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col items-center font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            {usuario.id ?
                                (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-stone-100">
                                            Olá, {usuario.nome.split(" ")[0]}
                                        </span>
                                        <Link to="/meusPedidos" className="text-white font-bold bg-stone-700 hover:bg-stone-600 focus:ring-2 focus:outline-none focus:ring-stone-500 rounded-lg text-sm px-3 py-2 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
                                            Meus Pedidos
                                        </Link>
                                        {usuario.tipo === 'FUNCIONARIO' && (
                                            <Link to="/funcionarios" className="text-white font-bold bg-amber-800 hover:bg-amber-700 focus:ring-2 focus:outline-none focus:ring-amber-500 rounded-lg text-sm px-3 py-2 text-center dark:bg-amber-700 dark:hover:bg-amber-800 dark:focus:ring-amber-900">
                                                Painel
                                            </Link>
                                        )}
                                        <span className="cursor-pointer font-bold text-stone-300 hover:text-white"
                                            onClick={usuarioSair}>
                                            Sair
                                        </span>
                                    </div>
                                )
                                :
                                (
                                    <Link to="/login" className="block py-2 px-3 md:p-0 text-stone-100 rounded-sm hover:bg-stone-700 md:hover:bg-transparent md:border-0 md:hover:text-amber-400 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        Entrar ou Cadastrar
                                    </Link>
                                )
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}