// File: confeitaria_frontend/src/admin/components/Titulo.tsx

import { FiUsers } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useAdminStore } from "../context/AdminContext"

export function Titulo() {
  const { admin } = useAdminStore()

  return (
    // Fundo em tom de chocolate vibrante (amber-800) e borda mais escura
    <nav className="bg-amber-800 border-amber-900 border-b-2 dark:bg-stone-900 flex flex-wrap justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link to="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* A imagem do fusca ainda está aqui, talvez você queira trocá-la por um logo de bolo! */}
          <img src="./bolologo.png" className="h-16" alt="Logo" />
          {/* Texto em branco para contraste */}
          <span className="self-center text-3xl font-serif whitespace-nowrap text-white dark:text-white">
            Confeitaria Doce Sabor: Admin
          </span>
        </Link>
      </div>
      {/* Informações do admin logado em branco para contraste */}
      <div className="flex me-4 items-center font-bold text-white dark:text-stone-100">
        <FiUsers className="mr-2" />
        {admin.nome}
      </div>
    </nav>
  )
}