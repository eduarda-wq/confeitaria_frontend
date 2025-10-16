// File: confeitaria_frontend/src/admin/AdminLogin.tsx

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'sonner'
import { useAdminStore } from "./context/AdminContext"

import { useNavigate } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  email: string
  senha: string
}

export default function AdminLogin() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>()
  const navigate = useNavigate()
  const { logaAdmin } = useAdminStore()

  useEffect(() => {
    setFocus("email")
  }, [])

  async function verificaLogin(data: Inputs) {
    const response = await fetch(`${apiUrl}/admins/login`, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ email: data.email, senha: data.senha })
    })

    // console.log(response)
    if (response.status == 200) {
      const admin = await response.json()
      logaAdmin(admin)
      navigate("/admin", { replace: true })
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos")
    }
  }

  return (
    // Fundo da página em marrom clarinho vibrante (creme/bege saturado)
    <main className="flex flex-col items-center p-6 bg-yellow-50 dark:bg-stone-900 min-h-screen">
      
      {/* Container Flex para o Logo, Título e Formulário */}
      {/* mx-auto e max-w-4xl limitam a largura e centralizam o bloco */}
      {/* flex-col md:flex-row para a imagem ir para o lado em telas maiores */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 mt-16 mx-auto">
        
        {/* Lado Esquerdo: Imagem e Título */}
        <div className="text-center w-full md:w-auto">
          {/* A imagem do fusca é grande, vamos reduzir um pouco para caber ao lado do formulário */}
          <img src="../../logo (2).png" alt="Logo Confeitaria" style={{ width: 180 }}
            className="d-block mx-auto" />

          {/* Título: Texto agora em tom de chocolate (amber-900) */}
          <div className="my-4 text-amber-900 dark:text-stone-100">
              <h2 className="text-xl font-bold">Admin</h2>
              <h1 className="text-4xl font-serif">Confeitaria Doce Sabor</h1>
          </div>
        </div>

        {/* Lado Direito: Formulário de Login */}
        <div className="w-full max-w-sm">
          {/* Formulário com fundo branco/marrom escuro e sombra */}
          <form className="mx-auto p-8 bg-white dark:bg-stone-800 rounded-lg shadow-xl"
            onSubmit={handleSubmit(verificaLogin)} >
            
            <div className="mb-5">
              {/* Rótulo em tom de chocolate */}
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-amber-900 dark:text-stone-100">E-mail:</label>
              <input type="email" id="email" 
                // Inputs com fundo mais vibrante (creme), foco e borda em caramelo (amber-600)
                className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
                {...register("email")}
                required />
            </div>
            
            <div className="mb-5">
              {/* Rótulo em tom de chocolate */}
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-amber-900 dark:text-stone-100">Senha:</label>
              <input type="password" id="password" 
                // Inputs com fundo mais vibrante (creme), foco e borda em caramelo (amber-600)
                className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
                {...register("senha")}
                required />
            </div>
            
            {/* Botão modificado: largura total (w-full) e cor chocolate vibrante (amber-800) */}
            <button type="submit" 
              className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-400 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-amber-700 dark:hover:bg-amber-800 dark:focus:ring-amber-500">
              Entrar
            </button>
          </form>
        </div>
      </div>

      <Toaster richColors position="top-right" />
    </main>
  );
}