import { CardBolo } from "./components/CardBolo";
import { InputPesquisa } from "./components/InputPesquisa";
import { ImageCarousel } from "./components/Carrossel";
import type { BoloType } from "./utils/BoloType";
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function App() {
  const [bolos, setBolos] = useState<BoloType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  

  const { logaCliente } = useClienteStore(); 

  useEffect(() => {
  
    async function buscaDados() {
      try {
        setError(null);
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/bolos/destaques`);
        if (!response.ok) throw new Error('Falha ao buscar os dados dos bolos.');
        const dados = await response.json();
        setBolos(dados);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

   
    async function buscaCliente(id: string) {
      try {
        const response = await fetch(`${apiUrl}/clientes/${id}`);
        const dados = await response.json();
        logaCliente(dados);
      } catch (err) {
        console.error("Erro ao buscar dados do cliente:", err);
      }
    }

    buscaDados();

    const idCliente = localStorage.getItem("clienteKey");
    if (idCliente) {
      buscaCliente(idCliente);
    }

    async function buscaBolosRecentes() {
      try {
        setError(null);
        setIsLoading(true);
        
        const response = await fetch(`${apiUrl}/bolos/recentes`);
        if (!response.ok) throw new Error('Falha ao buscar as novidades.');
        const dados = await response.json();
        setBolos(dados);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    buscaBolosRecentes();

  }, [logaCliente]);

  let conteudo;
  if (isLoading) {
    conteudo = <p className="text-center mt-10 text-xl">Carregando deliciosos bolos...</p>;
  } else if (error) {
    conteudo = <p className="text-center mt-10 text-xl text-red-500">Erro: {error}</p>;
  } else if (bolos.length === 0) {
    conteudo = <p className="text-center mt-10 text-xl">Nenhum bolo encontrado no momento. 😥</p>;
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
    
    <InputPesquisa 
        setBolos={setBolos}
        setIsLoading={setIsLoading}
        setError={setError}
        initialFetchUrl={`${apiUrl}/bolos/recentes`} // Limpar a busca volta para os recentes
      />
      <div className="max-w-7xl mx-auto my-8">
        <ImageCarousel />
      </div>
     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-primary-darkest md:text-5xl">
            Novidades da Semana
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Os últimos bolos que saíram do nosso forno, fresquinhos para você.
          </p>
        </div>

        {conteudo}

        {/* --- REINTRODUZINDO O BOTÃO "VER TODOS" --- */}
        {bolos.length > 0 && !isLoading && !error && (
          <div className="text-center mt-12">
            <Link
              to="/produtos" // O link agora tem um propósito claro
              className="inline-block rounded-lg bg-primary px-8 py-3 text-center text-lg font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light transition-transform duration-300 hover:scale-105"
            >
              Ver Cardápio Completo
            </Link>
          </div>
        )}
        
      </main>
    
    </>
  );
}