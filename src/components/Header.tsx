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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/bolologo.png" className="h-12" alt="Logo Confeitaria Doce Sabor" />
              <span className="text-2xl font-bold text-primary-darkest font-display">
                Doce Sabor
              </span>
            </Link>
          </div>

          {/* Itens do Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/produtos" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Produtos
              </Link>
              <Link to="/sobre" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Sobre Nós
              </Link>
              
              {/* --- A MÁGICA ACONTECE AQUI --- */}
              {cliente.id ? (
                // Se o cliente ESTÁ logado
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Olá, {cliente.nome.split(' ')[0]}!</span>
                  
                  {/* O NOSSO NOVO LINK FUNCIONAL! */}
                  <Link to="/meus-pedidos" className="font-medium text-primary hover:text-primary-dark transition-colors">
                    Meus Pedidos
                  </Link>

                  <span 
                    onClick={clienteSair} 
                    className="text-gray-500 hover:text-primary-dark cursor-pointer text-sm font-medium"
                  >
                    Sair
                  </span>
                </div>
              ) : (
                // Se o cliente NÃO ESTÁ logado
                <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors">
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