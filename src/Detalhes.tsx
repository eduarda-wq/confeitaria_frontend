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
        navigate('/meuspedidos'); 
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
      {/* Card Principal: Fundo Marrom Claro Acento (bg-amber-100), Borda Caramelo Suave (border-amber-200) */}
      <section className="flex flex-col md:flex-row bg-amber-100 border border-amber-200 rounded-lg shadow-xl overflow-hidden">
        <img
          className="object-cover w-full md:w-1/2 h-80 md:h-auto"
          src={bolo.foto}
          alt={`Foto do ${bolo.nome}`}
        />
        <div className="flex flex-col justify-between p-6 leading-normal w-full">
          <div>
            {/* Tag Categoria: Fundo Caramelo Claro (bg-amber-200), Texto Marrom Escuro (text-amber-900) */}
            <span className="bg-amber-200 text-amber-900 text-sm font-semibold px-2.5 py-0.5 rounded mb-2 inline-block">
              {bolo.categoria.nome}
            </span>
            {/* Título: Marrom Escuro Vibrante (text-amber-900) */}
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-amber-900">
              {bolo.nome}
            </h1>
            {/* Descrição: Marrom Suave (text-stone-700) */}
            <p className="mb-4 text-stone-700">
              {bolo.descricao}
            </p>
            {/* Peso: Marrom Suave (text-stone-600) */}
            <p className="mb-4 text-lg text-stone-600">
              Peso: <span className="font-semibold">{bolo.peso}g</span>
            </p>
            {/* Preço: Marrom Escuro Vibrante (text-amber-900) */}
            <p className="mb-6 text-5xl font-extrabold text-amber-900">
              {Number(bolo.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>

          {cliente.id ? (
            <button
              onClick={handleFazerPedido}
              // Botão: Fundo Marrom Escuro (bg-amber-900), Texto Marrom Claro (text-amber-50), Hover e Focus em tons de Marrom
              className="text-amber-50 bg-amber-900 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-lg w-full px-5 py-3 text-center transition-colors duration-300 shadow-lg"
            >
              Fazer Pedido Agora
            </button>
          ) : (
            // Box de Login: Fundo Caramelo Claro (bg-amber-200), Texto Marrom Escuro (text-amber-900)
            <div className="bg-amber-200 p-4 rounded-lg text-center">
              <h2 className="mb-2 text-xl font-bold text-amber-900">
                😍 Gostou deste bolo?
              </h2>
              {/* Link Login: Marrom Escuro Acento (text-amber-800) */}
              <Link to="/login" className="font-bold text-amber-800 hover:underline transition-colors">
                Faça Login para Pedir
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
);
}