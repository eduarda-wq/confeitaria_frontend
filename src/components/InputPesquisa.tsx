import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { BoloType } from "../utils/BoloType";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
  termo: string;
};

// 1. As props foram atualizadas para receber mais controles da página "pai"
type InputPesquisaProps = {
  setBolos: React.Dispatch<React.SetStateAction<BoloType[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  initialFetchUrl: string; // URL para buscar os dados originais (destaques ou todos)
};

export function InputPesquisa({ setBolos, setIsLoading, setError, initialFetchUrl }: InputPesquisaProps) {
  // 2. Adicionamos o 'watch' para observar o valor do campo de pesquisa em tempo real
  const { register, handleSubmit, reset, watch } = useForm<Inputs>();
  const termoPesquisado = watch("termo"); // Esta variável terá o valor atual do input

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      toast.error("Informe, no mínimo, 2 caracteres");
      return;
    }

    // 3. A lógica de busca agora controla o estado de loading e erro
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/bolos/pesquisa/${data.termo}`);
      if (!response.ok) throw new Error("Falha na busca.");
      const dados = await response.json();
      setBolos(dados);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // 4. A antiga função 'mostraDestaques' agora é 'resetarBusca', mais genérica
  async function resetarBusca() {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(initialFetchUrl); // Usa a URL inicial passada como prop
      if (!response.ok) throw new Error("Falha ao recarregar os bolos.");
      const dados = await response.json();
      setBolos(dados);
      reset({ termo: "" }); // Limpa o campo de texto do formulário
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center my-6">
      <form className="relative w-full max-w-2xl" onSubmit={handleSubmit(enviaPesquisa)}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {/* Ícone de Lupa: Marrom Acento (text-amber-600) */}
          <svg className="w-4 h-4 text-amber-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          // Input: Fundo Marrom Claro (bg-amber-50), Borda Caramelo (border-amber-300), Foco Marrom Escuro (focus:ring-amber-800)
          className="block w-full p-4 ps-10 text-sm text-amber-900 border border-amber-300 rounded-lg bg-amber-50 focus:ring-amber-800 focus:border-amber-800 placeholder-stone-500"
          placeholder="Busque por nome, categoria ou ingrediente..."
          required
          {...register('termo')}
        />
        
        {/* 5. Botão "Limpar" (X) que só aparece se houver texto */}
        {termoPesquisado && (
          <button
            type="button"
            onClick={resetarBusca}
            // Botão Limpar: Marrom Acento (text-amber-600), Hover Marrom Escuro (hover:text-amber-900)
            className="text-amber-600 absolute end-24 bottom-2.5 hover:text-amber-900 font-bold rounded-lg text-xl px-4 py-2"
            aria-label="Limpar pesquisa"
          >
            &times;
          </button>
        )}

        <button
          type="submit"
          // Botão Pesquisar: Fundo Marrom Escuro (bg-amber-900), Texto Marrom Claro (text-amber-50), Foco Caramelo Suave (focus:ring-amber-300)
          className="text-amber-50 absolute end-2.5 bottom-2.5 bg-amber-900 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-4 py-2 shadow-md transition-colors"
        >
          Pesquisar
        </button>
      </form>
    </div>
);
}