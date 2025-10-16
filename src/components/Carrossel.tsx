// Passo 1: Importar o CSS obrigatório da biblioteca
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

import img1 from '../assets/bolo4.jpg';
import img2 from '../assets/bolo2.jpg';
import img3 from '../assets/bolo1.jpg';

export function ImageCarousel() {
    return (
        <Carousel 
          autoPlay={true} 
          infiniteLoop={true} 
          showThumbs={false} 
          showStatus={false}
          className="rounded-lg overflow-hidden" >
          
            <div>
          
                <div className="h-96"> 
                    <img 
                      src={img1} 
                      alt="Bolo de chocolate" 
                      className="w-full h-full object-cover" 
                    />
                </div>
                <p className="legend">Bolo de Chocolate Intenso</p>
            </div>

   
            <div>
                <div className="h-96">
                    <img 
                      src={img2} 
                      alt="Bolo de morango" 
                      className="w-full h-full object-cover" 
                    />
                </div>
                <p className="legend">Torta de Morango com Nata</p>
            </div>

  
            <div>
                <div className="h-96">
                    <img 
                      src={img3} 
                      alt="Cupcakes" 
                      className="w-full h-full object-cover" 
                    />
                </div>
                <p className="legend">Cupcakes Coloridos para Festas</p>
            </div>
        </Carousel>
    );
}