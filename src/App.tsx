import { CardBolo } from "./components/CardBolo";
import { InputPesquisa } from "./components/InputPesquisa";
import type { BoloType } from "./utils/BoloType";
import { useEffect, useState } from "react";
import { useUsuarioStore } from "./context/UsuarioContext";

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [bolos, setBolos] = useState<BoloType[]>([])
  const { logaUsuario } = useUsuarioStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/bolos`)
      const dados = await response.json()
      setBolos(dados)
    }
    buscaDados()

    // Carrega dados do usuário do localStorage se existirem
    if (localStorage.getItem("usuarioKey")) {
      const usuarioSalvo = localStorage.getItem("usuarioKey")
      if (usuarioSalvo) {
        logaUsuario(JSON.parse(usuarioSalvo))
      }
    }
  }, [logaUsuario])

  const listaBolos = bolos.map(bolo => (
    <CardBolo data={bolo} key={bolo.id} />
  ))

  return (
    <>
      <InputPesquisa setBolos={setBolos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="my-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Nossos Bolos <span className="underline underline-offset-3 decoration-8 decoration-amber-700 dark:decoration-amber-600">em Destaque</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {listaBolos}
        </div>
      </div>
    </>
  );
}