import Slider from "./components/Slider";

const images = [
  {
    url: "/image1.jpg",
    alt: "Description de l'image 1",
    title: "Découvrez notre univers",
    subtitle: "Une expérience unique au cœur de notre savoir-faire"
  },
  {
    url: "/image2.jpg",
    alt: "Description de l'image 2",
    title: "Innovation et Excellence",
    subtitle: "Des solutions adaptées à vos besoins"
  },
  {
    url: "/image3.jpg",
    alt: "Description de l'image 2",
    title: "Notre Engagement",
    subtitle: "Qualité et satisfaction garanties"
  }
]

export default function Home() {
  return (
    <>
      <Slider images={images}  />
    </>
  );
}
