import { type BoloType } from '../utils/BoloType';
import { Link } from 'react-router-dom'; // Importe o Link!

interface Props {
  bolo: BoloType;
}

export function CardBolo({ bolo }: Props) {

  return (
    // 1. Fundo do Card (Marrom Claro) e Destaque no Hover (Sombra Marrom Escuro)
    <div className="relative bg-amber-50 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-amber-900/40">
        
        {/* ... selo de destaque ... */}
        
        {/* O link principal deve envolver a imagem */}
        <Link to={`/detalhes/${bolo.id}`}>
            <img className="w-full h-56 object-cover" src={bolo.foto} alt={`Foto do ${bolo.nome}`} />
        </Link>

        <div className="p-5">
            <Link to={`/detalhes/${bolo.id}`}>
                {/* Título: Marrom Escuro Vibrante e negrito */}
                <h5 className="text-xl font-semibold text-amber-900 mb-2 truncate">{bolo.nome}</h5>
            </Link>
            
            {/* ... categoria e preço ... 
               (Presumo que o preço esteja aqui, por isso adicionei classes de estilo nele)
            */}
            <div className="flex items-center justify-between mt-4">
                {/* Preço: Marrom Escuro (Maior destaque) */}
                <span className="text-3xl font-bold text-amber-900">{/* preço */}</span>
                
                {/* O botão também deve ser um Link */}
                <Link
                    to={`/detalhes/${bolo.id}`}
                    // 2. Botão: Fundo Marrom Escuro, Texto Marrom Claro
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-amber-50 bg-amber-800 rounded-lg hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 transition-colors"
                >
                    Ver detalhes
                </Link>
            </div>
        </div>
    </div>
)
}