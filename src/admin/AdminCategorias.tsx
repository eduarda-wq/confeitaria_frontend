// File: confeitaria_frontend/src/admin/AdminCategorias.tsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { useAdminStore } from "./context/AdminContext";
import type { CategoriaType } from "../utils/CategoriaType";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
  nome: string;
};

// Componente para Cadastro e Listagem de Categorias
export default function AdminCategorias() {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const { admin } = useAdminStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
  } = useForm<Inputs>();

  async function getCategorias() {
    const response = await fetch(`${apiUrl}/categorias`);
    const dados = await response.json();
    setCategorias(dados);
  }

  useEffect(() => {
    getCategorias();
    setFocus("nome");
  }, [setFocus]);

  // Função para incluir ou editar uma categoria
  async function onSubmit(data: Inputs) {
    if (!admin.token) {
        toast.error("Erro de autenticação: Token não encontrado.");
        return;
    }

    const isEdit = editandoId !== null;
    const url = isEdit ? `${apiUrl}/categorias/${editandoId}` : `${apiUrl}/categorias`;
    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        // Envia o token para autenticação
        Authorization: `Bearer ${admin.token}`, 
      },
      body: JSON.stringify({ nome: data.nome }),
    });

    if (response.status === 200 || response.status === 201) {
      const novaCategoria = await response.json();
      
      if (isEdit) {
        // Atualiza a lista local
        setCategorias(categorias.map(c => c.id === editandoId ? novaCategoria : c));
        toast.success(`Categoria "${novaCategoria.nome}" atualizada!`);
        setEditandoId(null);
      } else {
        // Adiciona à lista local
        setCategorias([...categorias, novaCategoria]);
        toast.success(`Categoria "${novaCategoria.nome}" incluída!`);
      }
      
      reset();
      setFocus("nome");
    } else {
      const errorData = await response.json();
      toast.error(`Erro: ${errorData.erro || 'Verifique o nome da categoria.'}`);
    }
  }

  // Funções de Ação na Tabela
  function iniciarEdicao(categoria: CategoriaType) {
    setEditandoId(categoria.id);
    setValue("nome", categoria.nome);
    setFocus("nome");
  }

  async function excluirCategoria(id: number, nome: string) {
    if (!admin.token) {
        toast.error("Erro de autenticação: Token não encontrado.");
        return;
    }
    if (confirm(`Deseja realmente excluir a categoria "${nome}"?`)) {
      const response = await fetch(`${apiUrl}/categorias/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${admin.token}`,
        },
      });

      if (response.status === 200) {
        setCategorias(categorias.filter(c => c.id !== id));
        toast.success(`Categoria "${nome}" excluída com sucesso.`);
      } else {
        toast.error("Erro ao excluir. Verifique se há bolos associados.");
      }
    }
  }

  return (
    <div className='m-4 mt-24'>
        {/* Título em tom de chocolate vibrante (amber-900) */}
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-amber-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Categorias
        </h1>

        {/* Formulário de Inclusão/Edição - Estilizado com amber */}
        <form className="max-w-xl mb-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-end space-x-4">
                <div className="flex-1">
                    <label htmlFor="nome" className="block mb-2 text-sm font-medium text-amber-900 dark:text-white">
                        Nome da Categoria ({editandoId ? 'Editando' : 'Nova'})
                    </label>
                    <input
                        type="text"
                        id="nome"
                        className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-amber-600 dark:focus:border-amber-600"
                        placeholder="Ex: Bolos Clássicos"
                        required
                        {...register("nome")}
                    />
                </div>
                
                {/* Botão de Ação (Incluir/Atualizar) com cor de chocolate vibrante */}
                <button type="submit" 
                    className="text-white bg-amber-800 hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-amber-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-700 dark:hover:bg-amber-800 dark:focus:ring-amber-500">
                    {editandoId ? 'Atualizar' : 'Incluir'}
                </button>
                {/* Botão Cancelar Edição */}
                {editandoId && (
                    <button type="button" onClick={() => { setEditandoId(null); reset() }}
                        className="text-amber-900 border border-amber-800 hover:bg-amber-100 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Cancelar
                    </button>
                )}
            </div>
        </form>

        {/* Tabela de Categorias - Estilizada com amber */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-xl">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* Cabeçalho da tabela com fundo em tom de creme/bege vibrante e texto em chocolate */}
            <thead className="text-xs text-amber-900 uppercase bg-amber-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Nome da Categoria</th>
                <th scope="col" className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(categoria => (
                <tr key={categoria.id} className="odd:bg-white odd:dark:bg-stone-900 even:bg-amber-50 even:dark:bg-stone-800 border-b dark:border-stone-700">
                  <td className="px-6 py-4 font-bold text-amber-900">{categoria.id}</td>
                  <td className="px-6 py-4 text-amber-900">{categoria.nome}</td>
                  <td className="px-6 py-4">
                      {/* Ícone Editar (Caramelo) */}
                      <FaRegEdit className="text-3xl text-amber-600 inline-block cursor-pointer" title="Editar"
                        onClick={() => iniciarEdicao(categoria)} />&nbsp;
                      {/* Ícone Excluir (Vermelho - cor padrão para ações perigosas) */}
                      <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
                        onClick={() => excluirCategoria(categoria.id, categoria.nome)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}