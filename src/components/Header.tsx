import { Link, useNavigate } from "react-router-dom";
import { useClienteStore } from "../context/ClienteContext";
import { toast } from 'sonner';

export default function Header() { 
  const { cliente, deslogaCliente } = useClienteStore();
  const navigate = useNavigate();

  function clienteSair() {
    toast.warning("Você tem certeza que deseja sair?", {
      action: { label: "Sim, sair", onClick: () => {
        deslogaCliente();
        if (localStorage.getItem("clienteKey")) {
          localStorage.removeItem("clienteKey");
        }
        navigate("/login");
      }},
      cancel: { label: "Cancelar", onClick: () => {} },
    });
  }

  return (
    // 1. Fundo do cabeçalho: Marrom Claro Vibrante (Caramelo/Creme)
    <header className="bg-amber-50 shadow-md sticky top-0 z-50"> 
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/bolologo.png" className="h-12" alt="Logo Confeitaria Doce Sabor" />
              {/* 2. Texto do Logo: Marrom Escuro Vibrante */}
              <span className="text-2xl font-bold text-amber-900 font-display">
                Doce Sabor
              </span>
            </Link>
          </div>

          {/* Itens do Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Links de navegação: Texto Marrom Escuro, Hover com Destaque */}
              <Link 
                to="/produtos" 
                className="text-stone-700 hover:text-amber-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Produtos
              </Link>
                          
              {/* --- Lógica de Login/Logout --- */}
              {cliente.id ? (
                // Se o cliente ESTÁ logado
                <div className="flex items-center space-x-4">
                  {/* Nome do Usuário: Marrom Escuro Suave */}
                  <span className="text-stone-700">Olá, {cliente.nome.split(' ')[0]}!</span>
                  
                  {/* Link Meus Pedidos: Destaque Marrom Escuro */}
                  <Link 
                    to="/meuspedidos" 
                    className="font-bold text-amber-900 hover:text-amber-800 transition-colors"
                  >
                    Meus Pedidos
                  </Link>

                  {/* Botão Sair: Tom Neutro, Hover com Marrom Escuro */}
                  <span 
                    onClick={clienteSair} 
                    className="text-stone-500 hover:text-amber-900 cursor-pointer text-sm font-medium"
                  >
                    Sair
                  </span>
                </div>
              ) : (
                // Se o cliente NÃO ESTÁ logado
                // Botão de Login: Fundo Marrom Escuro, Hover mais Escuro
                <Link 
                  to="/login" 
                  className="bg-amber-900 text-amber-50 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors shadow-lg"
                >
                  Login / Cadastrar
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}