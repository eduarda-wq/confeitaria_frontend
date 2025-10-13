import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useUsuarioStore } from "./context/UsuarioContext"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()
    const { logaUsuario } = useUsuarioStore()

    const navigate = useNavigate()

    async function verificaLogin(data: Inputs) {
        try {
            const response = await
                fetch(`${apiUrl}/login`, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ email: data.email, senha: data.senha })
                })

            if (response.status === 200) {
                const dados = await response.json()
                logaUsuario(dados)

                if (data.manter) {
                    localStorage.setItem("usuarioKey", JSON.stringify(dados))
                } else {
                    if (localStorage.getItem("usuarioKey")) {
                        localStorage.removeItem("usuarioKey")
                    }
                }

                toast.success("Login efetuado com sucesso!")
                navigate("/")
            } else {
                const erro = await response.json()
                toast.error(erro.erro || "Erro... Login ou senha incorretos")
            }
        } catch (error) {
            toast.error("Erro ao conectar com o servidor.")
        }
    }

    return (
        <section className="bg-stone-50 dark:bg-stone-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-stone-800 dark:border-stone-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-stone-900 md:text-2xl dark:text-white">
                            Acesse sua Conta
                        </h1>
                        <form className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(verificaLogin)} >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">Seu e-mail</label>
                                <input type="email" id="email"
                                    className="bg-stone-50 border border-stone-300 text-stone-900 rounded-lg focus:ring-amber-800 focus:border-amber-800 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-700 dark:focus:border-amber-700"
                                    required
                                    {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">Senha de Acesso</label>
                                <input type="password" id="password"
                                    className="bg-stone-50 border border-stone-300 text-stone-900 rounded-lg focus:ring-amber-800 focus:border-amber-800 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-700 dark:focus:border-amber-700"
                                    required
                                    {...register("senha")} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember"
                                            aria-describedby="remember" type="checkbox"
                                            className="w-4 h-4 border border-stone-300 rounded bg-stone-50 focus:ring-3 focus:ring-amber-300 dark:bg-stone-700 dark:border-stone-600 dark:focus:ring-amber-600 dark:ring-offset-stone-800"
                                            {...register("manter")} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-stone-500 dark:text-stone-300">Manter Conectado</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
                                Entrar
                            </button>
                            <p className="text-sm font-light text-stone-500 dark:text-stone-400">
                                Ainda não possui conta? <Link to="/cadastro" className="font-medium text-amber-700 hover:underline dark:text-amber-600">Cadastre-se</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}