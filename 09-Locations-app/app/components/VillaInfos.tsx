"use client";
import { FC } from "react";
import { CookingPot , Waves , Bath, Bed, Square } from "lucide-react"; // Importer les icônes de Lucide Dev


interface VillaInfoProps {
  surface: number; // surface en mètres carrés
  bedrooms: number; // nombre de chambres
  bathrooms: number; // nombre de salles de bain
  hasPool: boolean; // piscine
  hasKitchen: boolean; // cuisine aménagée
}

const VillaInfo: FC<VillaInfoProps> = ({
  surface,
  bedrooms,
  bathrooms,
  hasPool,
  hasKitchen,
}) => {
  return (
    <div className="max-w-[800px] mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Informations sur la Villa</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-2">
          {hasPool && <Waves  className="text-blue-500" />}
          <span className="text-lg font-medium">Piscine</span>
        </div>
        <div className="flex items-center space-x-2">
          {hasKitchen && <CookingPot  className="text-green-500" />}
          <span className="text-lg font-medium">Cuisine Aménagée</span>
        </div>
        <div className="flex items-center space-x-2">
          <Bath className="text-purple-500" />
          <span className="text-lg font-medium">{bathrooms} Salle(s) de Bain</span>
        </div>
        <div className="flex items-center space-x-2">
          <Bed className="text-yellow-500" />
          <span className="text-lg font-medium">{bedrooms} Chambre(s)</span>
        </div>
        <div className="flex items-center space-x-2">
          <Square className="text-gray-500" />
          <span className="text-lg font-medium">{surface} m²</span>
        </div>
      </div>
        <p className="mt-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, ipsum, repellat dolor vel minus tempore fuga pariatur obcaecati laudantium, expedita perspiciatis dolorem necessitatibus eos assumenda voluptatum ducimus doloribus veritatis. Iusto maxime eum enim quam doloribus autem, numquam doloremque perspiciatis mollitia exercitationem architecto incidunt aut, repudiandae consectetur tempore nihil itaque rem?</p>
    </div>
  );
};

export default VillaInfo;
