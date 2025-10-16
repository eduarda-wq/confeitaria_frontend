// NOVO ARQUIVO: confeitaria_frontend/src/components/Footer.tsx

import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa"; // Importado para dar um toque amigável

export default function Footer() {
  return (
    // Fundo em Marrom Claro Suave (Amber-100)
    // Texto em Chocolate (Amber-900)
    <footer className="bg-amber-100 border-t border-amber-300 dark:bg-stone-900 dark:border-stone-700 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Nome da Confeitaria e Slogan (Opcional) */}
        <p className="text-xl font-serif font-bold text-amber-900 dark:text-white">
          Loja de Bolos Doce Sabor
        </p>

        {/* Links Rápidos (Opcional, se houver outras rotas) */}
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <Link to="/" className="text-amber-700 hover:text-amber-900 dark:text-stone-300 dark:hover:text-white transition-colors">
            Início
          </Link>
          <Link to="/meuspedidos" className="text-amber-700 hover:text-amber-900 dark:text-stone-300 dark:hover:text-white transition-colors">
            Meus Pedidos
          </Link>
          <Link to="/admin" className="text-amber-700 hover:text-amber-900 dark:text-stone-300 dark:hover:text-white transition-colors">
            Acesso Admin
          </Link>
        </div>

        {/* Informação de Direitos Autorais/Créditos */}
        <p className="mt-6 text-sm text-amber-700 dark:text-stone-400">
          &copy; {new Date().getFullYear()} Doce Sabor. Feito com <FaHeart className="inline text-red-500 mx-1" /> e paixão.
        </p>
      </div>
    </footer>
  );
}