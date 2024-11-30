import React from 'react'
import Image from 'next/image'
import en  from '@/public/locales/en/common.json'
import fr  from '@/public/locales/fr/common.json'
import es  from '@/public/locales/es/common.json'
import { images } from '@/app/dataImgs'
import { useLang } from '@/app/context/langContext'
import { Destination,  Feature, Translations } from '@/app/types/types'

export default function Content() {

  const translations: Record<string, Translations> = {fr,en,es}
  const {lang} = useLang()
  const  t = translations[lang]

  const getDestination  =  (key: string) : Destination => {
    const dest  =  t.destinations[key]
    if(typeof  dest === 'string') throw new Error('Destination not found')
    return dest as Destination
  }
  const getFeature  =  (key: string) : Feature => {
    const dest  =  t.features[key]
    if(typeof  dest === 'string') throw new Error('Feature not found')
    return dest as Feature
  }

  return (
    <>
      <section className='min-h-screen'>
      <div className="relative h-screen">
        <div className="fixed w-full h-full -z-10">
          <Image 
            src={images.hero}
            alt='Travel background'
            fill 
            className='object-cover'
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-6xl font-bold mb-6 animate-fade-in">
                {t.hero.title}
              </h1>
              <p className="text-2xl mb-10 animation-fade-in">
                {t.hero.subtitle}
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-md transform hover:scale-105 transition-all animate-fade-in-delay-2">
                {t.hero.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          {t.destinations.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(images.destinations).map(([city, imageUrl]) => {
              const destination  = getDestination(city)
              return (
                <div key={city} className="rounded-lg overflow-hidden shadow-lg bg-white">
                  <div className="relative h-64">
                    <Image 
                      src={imageUrl}
                      fill 
                      className='object-cover'
                      alt={destination.title}
                      />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {destination.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {destination.description}
                    </p>
                  </div>
                  
                </div>
              )
            })}
          </div>
      </div>
    </section>

    <section className="py-20 bg-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          {t.features.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(images.features).map(([featureKey, imageUrl]) => {
              const feature  = getFeature(featureKey)
              return (
                <div key={featureKey} className="rounded-lg overflow-hidden shadow-lg bg-white py-4">
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image 
                      src={imageUrl}
                      fill 
                      className='object-cover'
                      alt={feature.title}
                      />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                  
                </div>
              )
            })}
          </div>
      </div>
    </section>

    <section className="py-20 bg-blue-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {t.cta.title}
        </h2>
        <p className="text-xl mb-8">
          {t.cta.subtitle}
        </p>
        <button className="bg-white text-blue-500 px-8 py-3 rounded-lg text-lg hover:bg-gray-100">
          {t.cta.button}
        </button>
      </div>
    </section>

    <section className="py-20  bg-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.gallery.map((imgUrl, index)=>  (
              <div key={index} className='relative h-64 group overflow-hidden rounded-lg'>
                <Image 
                  src={imgUrl}
                  fill 
                  className='object-cover transform group-hover:scale-110 transition-transform duration-500'
                  alt='Gallery image'
                />

              </div>
            ))}
          </div>
        </div>
    </section>


    <footer className="py-8 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>
            {t.footer.rights}
          </p>
          <div className="space-x-6">
            <a href="#" className="hover:text-gray-100">
              {t.footer.about}
            </a>
            <a href="#" className="hover:text-gray-100">
              {t.footer.contact}
            </a>
            <a href="#" className="hover:text-gray-100">
              {t.footer.terms}
            </a>
          </div>

        </div>
      </div>
    </footer>
    


    </>
  )
}
