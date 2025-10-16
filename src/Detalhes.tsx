import { useParams, Link, useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import { toast } from 'sonner';
import type { BoloType } from "./utils/BoloType";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Detalhes() {
  const { boloId } = useParams<{ boloId: string }>();
  const [bolo, setBolo] = useState<BoloType | null>(null);
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const { cliente } = useClienteStore();

  // ... (a lógica de busca do bolo com isLoading e error continua a mesma) ...

  // NOVA FUNÇÃO para criar o pedido e redirecionar
  async function handleFazerPedido() {
    // Verifica se o cliente está logado
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
        observacoes: "Pedido padrão via botão." // Podemos adicionar um campo de observações depois
      }),
    });

    toast.promise(promise, {
      loading: 'Processando seu pedido...',
      success: (response) => {
        if (!response.ok) throw new Error('Falha ao registrar o pedido.');
        // SUCESSO! Redireciona para a página de "Meus Pedidos"
        navigate('/meus-pedidos'); 
        return 'Pedido realizado com sucesso!';
      },
      error: 'Ops... Não foi possível realizar o pedido.',
    });
  }
  
  // ... (lógica de renderização de loading, error, etc.) ...

  return (
    <main className="max-w-5xl mx-auto ...">
      <section className="flex ...">
        {/* ... imagem e detalhes do bolo ... */}
        <div className="flex flex-col ...">
          {/* ... nome, preço, etc. ... */}

          {/* Se o cliente estiver logado, mostramos o botão */}
          {cliente.id ? (
            <button
              onClick={handleFazerPedido} // O botão agora chama a nossa nova função
              className="text-white bg-primary hover:bg-primary-dark ... text-lg w-full px-5 py-3 ..."
            >
              Fazer Pedido Agora
            </button>
          ) : (
            // Se não, guiamos para o login
            <div className="bg-primary-lightest p-4 ...">
              <h2 className="... text-primary-darkest">😍 Gostou deste bolo?</h2>
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