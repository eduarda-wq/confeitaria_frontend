import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import { toast } from 'sonner';

import type { BoloType } from "./utils/BoloType";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Detalhes() {
  const { boloId } = useParams<{ boloId: string }>();
  const [bolo, setBolo] = useState<BoloType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { cliente } = useClienteStore();

  useEffect(() => {
    // --- LÓGICA DE BUSCA DE DADOS (AGORA COMPLETA) ---
    async function buscaDados() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/bolos/${boloId}`);
        if (!response.ok) {
          throw new Error("Ops! Não encontramos este bolo.");
        }
        const dados = await response.json();
        setBolo(dados); // Guarda os dados do bolo no estado
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    // Executa a busca assim que o componente é montado
    buscaDados();
  }, [boloId]); // O useEffect depende do boloId para buscar um novo bolo se o URL mudar

  // Função para criar o pedido e redirecionar (continua a mesma)
  async function handleFazerPedido() {
    if (!cliente.id) {
      toast.error("Você precisa estar logado para fazer um pedido.");
      navigate('/login');
      return;
    }

    const promise = fetch(`${apiUrl}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clienteId: cliente.id,
        boloId: Number(boloId),
        observacoes: "Pedido padrão via botão."
      }),
    });

    toast.promise(promise, {
      loading: 'Processando seu pedido...',
      success: (response) => {
        if (!response.ok) throw new Error('Falha ao registrar o pedido.');
        navigate('/meus-pedidos'); 
        return 'Pedido realizado com sucesso! Você está sendo redirecionado.';
      },
      error: 'Ops... Não foi possível realizar o pedido.',
    });
  }

  // Lógica de renderização condicional
  if (isLoading) {
    return <p className="text-center mt-12 text-2xl">Carregando detalhes do bolo...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-2xl text-red-500">Erro: {error}</p>;
  }

  if (!bolo) {
    return <p className="text-center mt-12 text-2xl">Bolo não encontrado.</p>;
  }

  // Se tudo correu bem, mostra os detalhes do bolo
  return (
    <main className="max-w-5xl mx-auto mt-8 px-4">
      <section className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <img
          className="object-cover w-full md:w-1/2 h-80 md:h-auto"
          src={bolo.foto}
          alt={`Foto do ${bolo.nome}`}
        />
        <div className="flex flex-col justify-between p-6 leading-normal w-full">
          <div>
            <span className="bg-primary-lightest text-primary-darkest text-sm font-semibold px-2.5 py-0.5 rounded mb-2 inline-block">
              {bolo.categoria.nome}
            </span>
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
              {bolo.nome}
            </h1>
            <p className="mb-4 text-gray-700">
              {bolo.descricao}
            </p>
            <p className="mb-4 text-lg text-gray-600">
              Peso: <span className="font-semibold">{bolo.peso}g</span>
            </p>
            <p className="mb-6 text-5xl font-extrabold text-primary-darkest">
              {Number(bolo.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>

          {cliente.id ? (
            <button
              onClick={handleFazerPedido}
              className="text-black bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-lg w-full px-5 py-3 text-center transition-colors duration-300"
            >
              Fazer Pedido Agora
            </button>
          ) : (
            <div className="bg-primary-lightest p-4 rounded-lg text-center">
              <h2 className="mb-2 text-xl font-bold text-primary-darkest">
                😍 Gostou deste bolo?
              </h2>
              <Link to="/login" className="font-bold text-primary hover:underline">
                Faça Login para Pedir
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}