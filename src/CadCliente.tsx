import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "sonner"

type Inputs = {
    nome: string
    email: string
    cidade: string
    senha: string
    senha2: string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function CadCliente() {
    const { register, handleSubmit } = useForm<Inputs>()

    async function cadastraCliente(data: Inputs) {

        if (data.senha != data.senha2) {
            toast.error("Erro... Senha e Confirme Senha precisam ser iguais")
            return
        }

        const response = await
            fetch(`${apiUrl}/clientes`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    nome: data.nome,
                    cidade: data.cidade,
                    email: data.email,
                    senha: data.senha
                })
            })

        console.log(response)
        if (response.status == 201) {
            toast.success("Ok! Cadastro realizado com sucesso...")
            // carrega a página principal, após login do cliente
            // navigate("/login")
        } else {
            toast.error("Erro... Não foi possível realizar o cadastro")
        }
    }

return (
    // Fundo da Página: Marrom Claro Vibrante (bg-amber-50). Remoção de dark:bg-gray-900.
    <section className="bg-amber-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* Card do Formulário: Fundo Marrom Claro Acento (bg-amber-100). Remoção de dark classes. */}
        <div className="w-full bg-amber-100 rounded-lg shadow-xl sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* Título: Marrom Escuro Vibrante (text-amber-900). Remoção de dark:text-white. */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-amber-900 md:text-2xl">
              Cadastro de Cliente
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(cadastraCliente)}
            >
              {/* --- Campo Nome --- */}
              <div>
                {/* Label: Marrom Escuro (text-amber-900). Remoção de dark:text-white. */}
                <label
                  htmlFor="nome"
                  className="block mb-2 text-sm font-medium text-amber-900"
                >
                  Nome:
                </label>
                {/* Input: Fundo Marrom Claro (bg-amber-50), Borda Caramelo (border-amber-300), Foco Marrom (focus:ring-amber-600). Remoção de dark classes. */}
                <input
                  type="text"
                  id="nome"
                  className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 placeholder-stone-500"
                  placeholder="Seu nome completo"
                  required
                  {...register("nome")}
                />
              </div>

              {/* --- Campo E-mail --- */}
              <div>
                {/* Label: Marrom Escuro (text-amber-900). Remoção de dark:text-white. */}
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-amber-900"
                >
                  E-mail:
                </label>
                {/* Input: Fundo Marrom Claro, Borda Caramelo, Foco Marrom. Remoção de dark classes. */}
                <input
                  type="email"
                  id="email"
                  className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 placeholder-stone-500"
                  placeholder="nome@gmail.com"
                  required
                  {...register("email")}
                />
              </div>

              {/* --- Campo Cidade --- */}
              <div>
                {/* Label: Marrom Escuro (text-amber-900). Remoção de dark:text-white. */}
                <label
                  htmlFor="cidade"
                  className="block mb-2 text-sm font-medium text-amber-900"
                >
                  Cidade:
                </label>
                {/* Input: Fundo Marrom Claro, Borda Caramelo, Foco Marrom. Remoção de dark classes. */}
                <input
                  type="text"
                  id="cidade"
                  className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 placeholder-stone-500"
                  placeholder="Sua cidade"
                  required
                  {...register("cidade")}
                />
              </div>

              {/* --- Campo Senha de Acesso --- */}
              <div>
                {/* Label: Marrom Escuro (text-amber-900). Remoção de dark:text-white. */}
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-amber-900"
                >
                  Senha de Acesso:
                </label>
                {/* Input: Fundo Marrom Claro, Borda Caramelo, Foco Marrom. Remoção de dark classes. */}
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 placeholder-stone-500"
                  required
                  {...register("senha")}
                />
              </div>

              {/* --- Campo Confirme a Senha --- */}
              <div>
                {/* Label: Marrom Escuro (text-amber-900). Remoção de dark:text-white. */}
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-amber-900"
                >
                  Confirme a Senha:
                </label>
                {/* Input: Fundo Marrom Claro, Borda Caramelo, Foco Marrom. Remoção de dark classes. */}
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 placeholder-stone-500"
                  required
                  {...register("senha2")}
                />
              </div>

              {/* Botão de Ação: Fundo Marrom Escuro (bg-amber-900), Hover mais Escuro (hover:bg-amber-800). O texto é Marrom Claro (text-amber-50). Remoção de dark classes. */}
              <button
                type="submit"
                className="w-full text-amber-50 bg-amber-900 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md transition-colors"
              >
                Criar sua Conta
              </button>

              {/* Link de Login: Texto Marrom Suave (text-stone-600), Link Marrom Escuro (text-amber-800). Remoção de dark classes. */}
              <p className="text-sm font-light text-stone-600">
                Já possui uma conta?{" "}
                <Link
                  to="/login"
                  className="font-bold text-amber-800 hover:underline transition-colors"
                >
                  Faça Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
