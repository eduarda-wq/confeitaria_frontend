// File: confeitaria_frontend/src/admin/components/MenuLateral.tsx

import { useAdminStore } from "../context/AdminContext";
import { IoExitOutline } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
// ADICIONADO: FaTags para o ícone de categorias
import { FaCakeCandles, FaTags, FaUsers } from "react-icons/fa6"; 
import { BsClipboardCheck } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export function MenuLateral() {
  const navigate = useNavigate();
  const { admin, deslogaAdmin } = useAdminStore();

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      deslogaAdmin();
      navigate("/", { replace: true });
    }
  }

  // Estilos vibrantes (Caramelo/Chocolate)
  const linkClass = "flex items-center p-2 rounded-lg text-amber-900 hover:bg-amber-200 dark:hover:bg-stone-700 group";
  const iconClass = "h-5 text-amber-600 text-2xl group-hover:text-amber-900";
  const textClass = "ms-2 mt-1";

  return (
    <aside
      id="default-sidebar"
      className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-amber-100 dark:bg-stone-800">
        <ul className="space-y-2 font-medium">
          
          {/* Visão Geral */}
          <li>
            <Link to="/admin" className={linkClass}>
              <span className={iconClass}>
                <BiSolidDashboard />
              </span>
              <span className={textClass}>Visão Geral</span>
            </Link>
          </li>
          
          {/* NOVO: Cadastro de Categorias */}
          <li>
            <Link to="/admin/categorias" className={linkClass}>
              <span className={iconClass}>
                <FaTags /> {/* Ícone para Categorias */}
              </span>
              <span className="ms-2 mt-1">Categorias</span>
            </Link>
          </li>

          {/* Cadastro de Bolos */}
          <li>
            <Link to="/admin/bolos" className={linkClass}>
              <span className={iconClass}>
                <FaCakeCandles />
              </span>
              <span className={textClass}>Bolos</span>
            </Link>
          </li>
          
          {/* Controle de Pedidos */}
          <li>
            <Link
              to="/admin/pedidos"
              className={linkClass}
            >
              <span className={iconClass}>
                <BsClipboardCheck />
              </span>
              <span className={textClass}>Pedidos</span>
            </Link>
          </li>
          
          {/* Cadastro de Admins (Restrito ao Nível 5) */}
          {admin.nivel === 5 && (
            <li>
              <Link
                to="/admin/cadAdmin"
                className={linkClass}
              >
                <span className={iconClass}>
                  <FaRegUser />
                </span>
                <span className={textClass}>Admins</span>
              </Link>
            </li>
          )}
          
          {/* Sair do Sistema */}
          <li>
            <span
              className={`flex items-center p-2 cursor-pointer rounded-lg text-amber-900 hover:bg-amber-200 dark:hover:bg-stone-700 group`}
              onClick={adminSair}
            >
              <span className={iconClass}>
                <IoExitOutline />
              </span>
              <span className={textClass}>Sair do Sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}