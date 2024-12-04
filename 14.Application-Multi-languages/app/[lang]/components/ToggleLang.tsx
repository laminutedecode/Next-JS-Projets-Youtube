'use client';

import Image from 'next/image';
import { useLang } from '@/app/context/langContext';

const languages = {
  fr: {
    name: 'Français',
    flag: './france.svg'
  },
  en: {
    name: 'English',
    flag: './united-kingdom.svg'
  },
  es: {
    name: 'Español',
    flag: './spain.svg'
  }
};

export default function ToggleLang() {
  const { lang, setLang } = useLang();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative group">
        <button className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-all">
        <Image  src={languages[lang as keyof typeof languages]?.flag } width={16} height={16} alt='Flag'/>
        {/* keyof est un opérateur de type qui permet de récupérer les clés d'un type d'objet en tant qu'union de chaînes. */}
          <span className="font-medium text-gray-800 text-sm">{languages[lang as keyof typeof languages].name}</span>
        </button>

        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top scale-95 group-hover:scale-100">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                lang === code ? 'text-blue-500 font-medium' : 'text-gray-700'
              }`}
            >
              <Image src={flag as string} width={20} height={20} alt="flag"/>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
