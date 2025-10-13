import { CardBolo } from "./components/CardBolo";
import { InputPesquisa } from "./components/InputPesquisa";
import type { BoloType } from "./utils/BoloType";
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function App() {
  const [bolos, setBolos] = useState<BoloType[]>([]);
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/bolos/destaques`);
      const dados = await response.json();
      setBolos(dados);
    }
    buscaDados();

    async function buscaCliente(id: string) {
      const response = await fetch(`${apiUrl}/clientes/${id}`);
      const dados = await response.json();
      logaCliente(dados);
    }
    if (localStorage.getItem("clienteKey")) {
      const idCliente = localStorage.getItem("clienteKey");
      buscaCliente(idCliente as string);
    }
  }, []);

  const listaBolos = bolos.map((bolo) => (
    <CardBolo data={bolo} key={bolo.id} />
  ));

  return (
    <>
      <InputPesquisa setBolos={setBolos} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Bolos{" "}
          <span className="underline underline-offset-3 decoration-8 decoration-pink-400 dark:decoration-pink-600">
            em destaque
          </span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaBolos}
        </div>
      </div>
    </>
  );
}
