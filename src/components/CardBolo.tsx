// Documentação:
// Esta é a nova versão do CardBolo, sem dependências do Flowbite.
// Recriamos a estrutura do card e do selo "Destaque" usando elementos HTML
// padrão (`div`, `img`, `span`) e classes utilitárias do Tailwind CSS.

import { type BoloType } from '../utils/BoloType';

interface Props {
  bolo: BoloType;
}

export function CardBolo({ bolo }: Props) {
  return (
    // Recriando o <Card> do Flowbite com Tailwind:
    // - `relative`: Necessário para posicionar o selo de destaque.
    // - `bg-white`: Cor de fundo do card.
    // - `border border-gray-200`: Adiciona uma borda sutil.
    // - `rounded-lg`: Deixa as bordas arredondadas.
    // - `shadow`: Adiciona uma sombra sutil.
    // - `overflow-hidden`: Garante que a imagem não "vaze" das bordas arredondadas.
    <div className="relative bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
      
      {/* Lógica para mostrar o selo de Destaque */}
      {bolo.destaque && (
        // Recriando o <Badge> do Flowbite com Tailwind:
        // - Usamos um `span` com posicionamento `absolute`.
        // - Classes de cor, tamanho de texto, padding e cantos arredondados.
        <span className="absolute top-2 right-2 bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          Destaque!
        </span>
      )}

      {/* Imagem do Bolo */}
      <a href="#">
        <img className="w-full h-56 object-cover" src={bolo.foto} alt={`Foto do ${bolo.nome}`} />
      </a>

      {/* Conteúdo do Card */}
      <div className="p-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {bolo.nome}
          </h5>
        </a>
        <div className="mb-5 mt-2.5 flex items-center">
          {/* Tag de Categoria */}
          <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {bolo.categoria.nome}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">
            {bolo.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <a
            href="#"
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Ver detalhes
          </a>
        </div>
      </div>
    </div>
  );
}