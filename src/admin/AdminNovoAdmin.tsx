// File: confeitaria_frontend/src/admin/AdminNovoAdmin.tsx

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { useAdminStore } from "./context/AdminContext";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  nivel: number;
};

export default function AdminNovoAdmin() {
  const { admin } = useAdminStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
  } = useForm<Inputs>();

  useEffect(() => {
    // Redireciona se não for o Admin Principal (Nivel 5)
    if (admin.nivel !== 5) {
      toast.error("Somente o Administrador Principal pode cadastrar novos usuários.");
      navigate("/admin", { replace: true });
    }
    setFocus("nome");
  }, [admin, navigate, setFocus]);

  async function incluirAdmin(data: Inputs) {
    // Garante que o nível seja 2 (Funcionário) ou 5 (Admin Principal)
    const nivel = Number(data.nivel) === 2 || Number(data.nivel) === 5 ? Number(data.nivel) : 2;

    const novoAdmin = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      nivel: nivel,
    };

    const response = await fetch(`${apiUrl}/admins`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify(novoAdmin),
    });

    if (response.status === 201) {
      toast.success(`Ok! Usuário (Nível ${nivel}) cadastrado com sucesso`);
      reset();
      setFocus("nome");
    } else {
      const errorData = await response.json();
      toast.error(`Erro no cadastro do Usuário: ${errorData.erro || 'Verifique os dados'}`);
    }
  }

  if (admin.nivel !== 5) return null; // Não renderiza se não tiver permissão

  return (
    <>
      {/* Título em tom de chocolate vibrante (amber-900) */}
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-amber-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Cadastro de Novo Administrador / Funcionário
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirAdmin)}>
        <div className="mb-3">
          {/* Rótulo em tom de chocolate */}
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
            Nome Completo
          </label>
          <input
            type="text"
            id="nome"
            // Estilos do input: fundo bege, borda/foco em caramelo
            className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
            required
            {...register("nome")}
          />
        </div>
        <div className="mb-3">
          {/* Rótulo em tom de chocolate */}
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            // Estilos do input: fundo bege, borda/foco em caramelo
            className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
            required
            {...register("email")}
          />
        </div>
        <div className="mb-3">
          {/* Rótulo em tom de chocolate */}
          <label htmlFor="senha" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            // Estilos do input: fundo bege, borda/foco em caramelo
            className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
            required
            {...register("senha")}
          />
        </div>
        <div className="mb-6">
          {/* Rótulo em tom de chocolate */}
          <label htmlFor="nivel" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
            Nível de Acesso
          </label>
          <select
            id="nivel"
            // Estilos do select: fundo bege, borda/foco em caramelo
            className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
            required
            defaultValue={2}
            {...register("nivel", { valueAsNumber: true })}
          >
            <option value={2}>2 - Funcionário</option>
            <option value={5}>5 - Admin (Proprietário)</option>
          </select>
        </div>

        {/* Botão de Cadastrar com cor de chocolate vibrante (amber-800) */}
        <button type="submit" 
          className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-700 dark:hover:bg-amber-800 dark:focus:ring-amber-500">
          Cadastrar
        </button>
      </form>
    </>
  );
}