import { CardBolo } from "./components/CardBolo";
import { InputPesquisa } from "./components/InputPesquisa";
import type { BoloType } from "./utils/BoloType";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Produtos() {
  const [bolos, setBolos] = useState<BoloType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function buscaTodosOsBolos() {
      try {
        setError(null);
        setIsLoading(true);
        // A diferença está aqui: buscamos '/bolos' para obter todos os produtos.
        const response = await fetch(`${apiUrl}/bolos`);
        if (!response.ok) {
          throw new Error('Falha ao buscar nosso catálogo de bolos.');
        }
        const dados = await response.json();
        setBolos(dados);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    buscaTodosOsBolos();
  }, []);

  // Lógica de renderização condicional (loading, erro, etc.)
  let conteudo;
  if (isLoading) {
    conteudo = <p className="text-center mt-10 text-xl">Carregando nosso catálogo completo...</p>;
  } else if (error) {
    conteudo = <p className="text-center mt-10 text-xl text-red-500">Erro: {error}</p>;
  } else if (bolos.length === 0) {
    conteudo = <p className="text-center mt-10 text-xl">Nenhum bolo cadastrado no momento. 😥</p>;
  } else {
    const listaBolos = bolos.map(bolo => (
      <CardBolo bolo={bolo} key={bolo.id} />
    ));
    conteudo = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listaBolos}
      </div>
    );
  }

  return (
    <>
      <InputPesquisa setBolos={setBolos} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary-darkest md:text-5xl">
            Nosso Cardápio
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Explore todos os nossos sabores e encontre o bolo perfeito para você.
          </p>
        </div>
        {conteudo}
      </main>
    </>
  );
}