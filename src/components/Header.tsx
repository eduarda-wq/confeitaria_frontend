import { Link } from "react-router-dom"
import { useClienteStore } from "../context/ClienteContext"
import { useNavigate } from "react-router-dom"

export default function Header() {
    const { cliente, deslogaCliente } = useClienteStore()
    const navigate = useNavigate()

    function clienteSair() {
        if (confirm("Confirma saída do sistema?")) {
            deslogaCliente()
            if (localStorage.getItem("clienteKey")) {
                localStorage.removeItem("clienteKey")
            }
            navigate("/login")
        }
    }

    return (
        <nav className="border-pink-500 bg-pink-400 dark:bg-pink-800 dark:border-pink-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./bolo.png" className="h-12" alt="Logo Loja de Bolos" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Loja de Bolos
                    </span>
                </Link>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            {cliente.id ?
                                <>
                                    <span className="text-white font-semibold">
                                        Olá, {cliente.nome}
                                    </span>&nbsp;&nbsp;
                                    <Link to="/meusPedidos" className="text-white font-bold bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:outline-none focus:ring-purple-400 rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-700">
                                        Meus Pedidos
                                    </Link>&nbsp;&nbsp;
                                    <span className="cursor-pointer font-bold text-gray-800 hover:text-white"
                                        onClick={clienteSair}>
                                        Sair
                                    </span>
                                </>
                                :
                                <Link to="/login" className="block py-2 px-3 md:p-0 text-white rounded-sm hover:bg-pink-500 md:hover:bg-transparent md:border-0 md:hover:text-gray-200 dark:text-white">
                                    Login / Cadastre-se
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}