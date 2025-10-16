import { useForm } from "react-hook-form"

import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner"
import { useClienteStore } from "./context/ClienteContext"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()    
    const { logaCliente } = useClienteStore()

    const navigate = useNavigate()

    async function verificaLogin(data: Inputs) {
        // alert(`${data.email} ${data.senha} ${data.manter}`)
        const response = await 
          fetch(`${apiUrl}/clientes/login`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha })
          })
        
        // console.log(response)
        if (response.status == 200) {
            // toast.success("Ok!")            
            const dados = await response.json()

            // "coloca" os dados do cliente no contexto
            logaCliente(dados)
            
            // se o cliente indicou que quer se manter conectado
            // salvamos os dados (id) dele em localStorage
            if (data.manter) {
                localStorage.setItem("clienteKey", dados.id)
            } else {
                // se indicou que não quer permanecer logado e tem
                // uma chave (anteriormente) salva, remove-a
                if (localStorage.getItem("clienteKey")) {
                    localStorage.removeItem("clienteKey")
                }
            }

            // carrega a página principal, após login do cliente
            navigate("/")
        } else {
            toast.error("Erro... Login ou senha incorretos")
        }
    }

     return (
    // Fundo da Página: Marrom Claro Vibrante (bg-amber-50). Remoção de dark classes.
    <section className="bg-amber-50">
      <p style={{ height: 48 }}></p>
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* Card do Formulário: Fundo Marrom Claro Acento (bg-amber-100). Remoção de dark classes. */}
        <div className="w-full bg-amber-100 rounded-lg shadow-xl sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* Título: Marrom Escuro Vibrante (text-amber-900). Remoção de dark classes. */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-amber-900 md:text-2xl">
              Dados de Acesso do Cliente
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(verificaLogin)}
            >
              {/* --- Campo E-mail --- */}
              <div>
                {/* Label: Marrom Escuro (text-amber-900). Remoção de dark classes. */}
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-amber-900"
                >
                  Seu e-mail
                </label>
                {/* Input: Fundo Marrom Claro (bg-amber-50), Borda Caramelo (border-amber-300), Foco Marrom (focus:ring-amber-600). Remoção de dark classes. */}
                <input
                  type="email"
                  id="email"
                  className="bg-amber-50 border border-amber-300 text-amber-900 rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 placeholder-stone-500"
                  required
                  {...register("email")}
                />
              </div>

              {/* --- Campo Senha --- */}
              <div>
                {/* Label: Marrom Escuro (text-amber-900). Remoção de dark classes. */}
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-amber-900"
                >
                  Senha de Acesso
                </label>
                {/* Input: Fundo Marrom Claro, Borda Caramelo, Foco Marrom. Remoção de dark classes. */}
                <input
                  type="password"
                  id="password"
                  className="bg-amber-50 border border-amber-300 text-amber-900 rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 placeholder-stone-500"
                  required
                  {...register("senha")}
                />
              </div>

              {/* --- Manter Conectado e Esqueceu Senha --- */}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    {/* Checkbox: Borda Caramelo (border-amber-300), Fundo Marrom Claro (bg-amber-50), Foco Marrom (focus:ring-amber-600). Remoção de dark classes. */}
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-amber-300 rounded bg-amber-50 focus:ring-3 focus:ring-amber-600"
                      {...register("manter")}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    {/* Label: Marrom Suave (text-stone-600). Remoção de dark classes. */}
                    <label htmlFor="remember" className="text-stone-600">
                      Manter Conectado
                    </label>
                  </div>
                </div>
                {/* Link Esqueceu Senha: Marrom Escuro Acento (text-amber-800). Remoção de dark classes. */}
                <a
                  href="#"
                  className="text-sm font-medium text-amber-800 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>

              {/* Botão de Ação: Fundo Marrom Escuro (bg-amber-900), Hover mais Escuro (hover:bg-amber-800). Remoção de dark classes. */}
              <button
                type="submit"
                className="w-full text-amber-50 bg-amber-900 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md transition-colors"
              >
                Entrar
              </button>

              {/* Link de Cadastro: Texto Marrom Suave (text-stone-600), Link Marrom Escuro (text-amber-800). Remoção de dark classes. */}
              <p className="text-sm font-light text-stone-600">
                Ainda não possui conta?{" "}
                <Link
                  to="/cadCliente"
                  className="font-bold text-amber-800 hover:underline transition-colors"
                >
                  Cadastre-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
