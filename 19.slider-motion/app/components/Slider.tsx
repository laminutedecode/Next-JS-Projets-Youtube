"use client"

import {useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface SliderProps {
  images: {
    url: string
    alt: string
    title: string
    subtitle: string
  }[]
}


export default function Slider({images} : SliderProps) {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1, 
      x: 0, 
      opacity: 1 
    },
    exit: (direction: number) => ({
      zIndex: 0, 
      x: direction < 0 ? 1000 : -1000,
      opacity: 0 
    })
  }

  const handleNext = () => {
    setDirection(1) 
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    )
  }

  const handlePrevious = () => {
    setDirection(-1) 
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1 
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-200">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img 
          key={currentIndex}
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {type: "spring", stiffness: 300, damping: 30},
            opacity: {duration: .2}
          }}
          className="absolute h-full w-full object-wover"
        />
        <motion.div
          key={`overlay-${currentIndex}`}
          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-8 z-[60]"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: .2}}
        >
          <h2 className="text-4xl text-center">
            {images[currentIndex].title}
          </h2>
          <p className="text-xl text-center">
            {images[currentIndex].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>


      <div className="absolute inset-0 flex items-center justify-between p-4 z-[100]">

        <button className="rounded-full bg-black/50 p-3 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/70" aria-label="Image précedente" onClick={handlePrevious}>
          <ChevronLeft className="w-8 h-8"/>
        </button>
        <button className="rounded-full bg-black/50 p-3 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black/70" aria-label="Image suivante" onClick={handleNext}>
          <ChevronRight className="w-8 h-8"/>
        </button>
      </div>


      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-[80]">
        {images.map((_, index) => (
          <button key={index} onClick={()=> {
            setDirection(index > currentIndex ? 1 : -1)
            setCurrentIndex(index)
          }} className={`h-3 rounded-full transition-all ${index === currentIndex ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/80"}`} aria-label={`Aller à l'image ${index + 1}`}>

          </button>
        ))}
      </div>

    </div>
  )
}
