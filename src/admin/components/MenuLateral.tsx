import { useAdminStore } from "../context/AdminContext";
import { toast } from "sonner";

// Importando todos os ícones necessários para o menu
import { BiSolidDashboard, BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaRegUser } from "react-icons/fa";
import { TbClipboardText } from "react-icons/tb";
import { IoExitOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

export function MenuLateral() {
  const navigate = useNavigate();
  const { admin, deslogaAdmin } = useAdminStore();

  function adminSair() {
    toast.warning("Você tem certeza que deseja sair?", {
      action: {
        label: "Sim, sair",
        onClick: () => {
          deslogaAdmin();
          navigate("/", { replace: true });
        },
      },
      cancel: {
        label: "Cancelar",
        // --- A CORREÇÃO ESTÁ AQUI ---
        // Adicionamos uma função onClick vazia para cumprir o contrato do TypeScript.
        // A biblioteca 'sonner' já sabe que o botão de cancelar deve fechar o toast.
        onClick: () => {},
      },
      duration: 5000,
    });
  }

  return (
    <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-primary-lightest dark:bg-primary-darkest">
        <ul className="space-y-2 font-medium">
          {/* Item: Visão Geral */}
          <li>
            <Link to="/admin" className="flex items-center p-2 rounded-lg text-primary-darkest dark:text-white hover:bg-primary-light dark:hover:bg-primary-dark group">
              <span className="text-2xl"><BiSolidDashboard /></span>
              <span className="ms-2">Visão Geral</span>
            </Link>
          </li>
          
          {/* Item: Cadastro de Bolos */}
          <li>
            <Link to="/admin/bolos" className="flex items-center p-2 rounded-lg text-primary-darkest dark:text-white hover:bg-primary-light dark:hover:bg-primary-dark group">
              <span className="text-2xl"></span>
              <span className="ms-2">Cadastro de Bolos</span>
            </Link>
          </li>
          
          {/* Item: Controle de Categorias */}
          <li>
            <Link to="/admin/categorias" className="flex items-center p-2 rounded-lg text-primary-darkest dark:text-white hover:bg-primary-light dark:hover:bg-primary-dark group">
              <span className="text-2xl"><BiSolidCategory /></span>
              <span className="ms-2">Controle de Categorias</span>
            </Link>
          </li>

          {/* Item: Controle de Clientes */}
          <li>
            <Link to="/admin/clientes" className="flex items-center p-2 rounded-lg text-primary-darkest dark:text-white hover:bg-primary-light dark:hover:bg-primary-dark group">
              <span className="text-2xl"><FaUsers /></span>
              <span className="ms-2">Controle de Clientes</span>
            </Link>
          </li>

          {/* Item: Controle de Pedidos */}
          <li>
            <Link to="/admin/pedidos" className="flex items-center p-2 rounded-lg text-primary-darkest dark:text-white hover:bg-primary-light dark:hover:bg-primary-dark group">
              <span className="text-2xl"><TbClipboardText /></span>
              <span className="ms-2">Controle de Pedidos</span>
            </Link>
          </li>

          {/* Item condicional: Cadastro de Admins */}
          {admin.nivel >= 5 && (
            <li>
              <Link to="/admin/cadAdmin" className="flex items-center p-2 rounded-lg text-primary-darkest dark:text-white hover:bg-primary-light dark:hover:bg-primary-dark group">
                <span className="text-2xl"><FaRegUser /></span>
                <span className="ms-2">Cadastro de Admins</span>
              </Link>
            </li>
          )}

          {/* Item: Sair do Sistema */}
          <li>
            <div onClick={adminSair} className="flex items-center p-2 rounded-lg text-primary-darkest dark:text-white hover:bg-primary-light dark:hover:bg-primary-dark group cursor-pointer">
              <span className="text-2xl"><IoExitOutline /></span>
              <span className="ms-2">Sair do Sistema</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}