import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"

type Inputs = {
    nome: string,
    email: string,
    senha: string,
    confirma: string,
}

const apiUrl = import.meta.env.VITE_API_URL

export default function CadastroUsuario() {
    const { register, handleSubmit } = useForm<Inputs>()
    const navigate = useNavigate()

    async function cadastraUsuario(data: Inputs) {
        if (data.senha !== data.confirma) {
            toast.error("As senhas não coincidem.")
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/usuarios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha
                })
            });

            if (response.status === 201) {
                toast.success("Cadastro realizado com sucesso! Faça seu login.");
                navigate("/login");
            } else {
                const erroData = await response.json();
                // Tenta formatar os erros do Zod ou mostra a mensagem genérica
                if (erroData.erro && Array.isArray(erroData.erro)) {
                    const mensagens = erroData.erro.map((e: any) => e.message).join('\n');
                    toast.error(mensagens);
                } else if (erroData.erro) {
                    toast.error(erroData.erro);
                } else {
                    toast.error("Erro ao realizar o cadastro. Tente novamente.");
                }
            }
        } catch (error) {
            toast.error("Erro de conexão. Verifique sua rede e tente novamente.");
        }
    }

    return (
        <section className="bg-stone-50 dark:bg-stone-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-stone-800 dark:border-stone-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-stone-900 md:text-2xl dark:text-white">
                            Crie sua Conta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(cadastraUsuario)}>
                            <div>
                                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">Nome Completo</label>
                                <input type="text" id="nome"
                                    className="bg-stone-50 border border-stone-300 text-stone-900 rounded-lg focus:ring-amber-800 focus:border-amber-800 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white"
                                    required {...register("nome")} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">Seu e-mail</label>
                                <input type="email" id="email"
                                    className="bg-stone-50 border border-stone-300 text-stone-900 rounded-lg focus:ring-amber-800 focus:border-amber-800 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white"
                                    required {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="senha" className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">Senha</label>
                                <input type="password" id="senha"
                                    className="bg-stone-50 border border-stone-300 text-stone-900 rounded-lg focus:ring-amber-800 focus:border-amber-800 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white"
                                    required {...register("senha")} />
                            </div>
                            <div>
                                <label htmlFor="confirma" className="block mb-2 text-sm font-medium text-stone-900 dark:text-white">Confirmar Senha</label>
                                <input type="password" id="confirma"
                                    className="bg-stone-50 border border-stone-300 text-stone-900 rounded-lg focus:ring-amber-800 focus:border-amber-800 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white"
                                    required {...register("confirma")} />
                            </div>
                            <button type="submit" className="w-full text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
                                Criar Conta
                            </button>
                            <p className="text-sm font-light text-stone-500 dark:text-stone-400">
                                Já possui uma conta? <Link to="/login" className="font-medium text-amber-700 hover:underline dark:text-amber-600">Entrar</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}