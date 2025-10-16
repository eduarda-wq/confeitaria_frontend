// File: confeitaria_frontend/src/admin/AdminNovoBolo.tsx

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import type { CategoriaType } from "../utils/CategoriaType";
import { useAdminStore } from "./context/AdminContext";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
  nome: string;
  categoriaId: number;
  preco: number;
  peso: number;
  foto: string;
  descricao: string;
  adminId: string;
};

export default function AdminNovoBolo() {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const { admin } = useAdminStore();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
  } = useForm<Inputs>();

  useEffect(() => {
    async function getCategorias() {
      const response = await fetch(`${apiUrl}/categorias`);
      const dados = await response.json();
      setCategorias(dados);
    }
    getCategorias();
    setFocus("nome");
  }, []);

  const optionsCategoria = categorias.map((categoria) => (
    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
  ));

  async function incluirBolo(data: Inputs) {
    const novoBolo = {
      nome: data.nome,
      categoriaId: Number(data.categoriaId),
      preco: Number(data.preco),
      peso: Number(data.peso),
      foto: data.foto,
      descricao: data.descricao,
      adminId: admin.id,
    };

    const response = await fetch(`${apiUrl}/bolos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${admin.token}`,
      },
      body: JSON.stringify(novoBolo),
    });

    if (response.status === 201) {
      toast.success("Ok! Bolo cadastrado com sucesso");
      reset();
      setFocus("nome");
    } else {
      const errorData = await response.json();
      toast.error(`Erro no cadastro do Bolo: ${errorData.erro || 'Verifique os dados'}`);
    }
  }

  return (
    <>
      {/* Título com cor de chocolate vibrante (amber-900) */}
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-amber-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Bolos
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirBolo)}>
        <div className="mb-3">
          {/* Rótulo em tom de chocolate */}
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
            Nome do Bolo
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
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div>
            {/* Rótulo em tom de chocolate */}
            <label htmlFor="categoriaId" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
              Categoria
            </label>
            <select
              id="categoriaId"
              // Estilos do select: fundo bege, borda/foco em caramelo
              className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
              required
              {...register("categoriaId")}
            >
              <option value="">Selecione a Categoria</option>
              {optionsCategoria}
            </select>
          </div>
          <div>
            {/* Rótulo em tom de chocolate */}
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
              Preço R$
            </label>
            <input
              type="number"
              id="preco"
              step="0.01"
              // Estilos do input: fundo bege, borda/foco em caramelo
              className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
              required
              {...register("preco")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div>
            {/* Rótulo em tom de chocolate */}
            <label htmlFor="peso" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
              Peso (kg)
            </label>
            <input
              type="number"
              id="peso"
              step="0.01"
              // Estilos do input: fundo bege, borda/foco em caramelo
              className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
              required
              {...register("peso")}
            />
          </div>
          <div>
            {/* Rótulo em tom de chocolate */}
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
              URL da Foto
            </label>
            <input
              type="text"
              id="foto"
              // Estilos do input: fundo bege, borda/foco em caramelo
              className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
              required
              {...register("foto")}
            />
          </div>
        </div>
        <div className="mb-3">
          {/* Rótulo em tom de chocolate */}
          <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
            Descrição e Ingredientes
          </label>
          <textarea
            id="descricao"
            rows={4}
            // Estilos do textarea: fundo bege, borda/foco em caramelo
            className="block p-2.5 w-full text-sm text-amber-900 bg-amber-50 rounded-lg border border-amber-300 focus:ring-amber-600 focus:border-amber-600 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
            {...register("descricao")}
          ></textarea>
        </div>

        {/* Botão de Incluir com cor de chocolate vibrante (amber-800) */}
        <button type="submit" className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Incluir
        </button>
      </form>
    </>
  );
}