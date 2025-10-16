import { type BoloType } from '../utils/BoloType';
import { Link } from 'react-router-dom'; // Importe o Link!

interface Props {
  bolo: BoloType;
}

export function CardBolo({ bolo }: Props) {
  return (
    <div className="relative bg-white ... hover:shadow-xl">
      {/* ... selo de destaque ... */}
      
      {/* O link principal deve envolver a imagem */}
      <Link to={`/detalhes/${bolo.id}`}>
        <img className="w-full h-56 object-cover" src={bolo.foto} alt={`Foto do ${bolo.nome}`} />
      </Link>

      <div className="p-5">
        <Link to={`/detalhes/${bolo.id}`}>
          <h5 className="text-xl ... truncate">{bolo.nome}</h5>
        </Link>
        {/* ... categoria e preço ... */}
        <div className="flex items-center justify-between">
          <span className="text-3xl ...">{/* preço */}</span>
          
          {/* O botão também deve ser um Link */}
          <Link
            to={`/detalhes/${bolo.id}`}
            className="rounded-lg bg-primary ..."
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}