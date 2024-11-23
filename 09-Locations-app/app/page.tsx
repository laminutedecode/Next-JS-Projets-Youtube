import ImageGallery from "./components/Gallery";
import Header from "./components/Header";
import VillaInfo from "./components/VillaInfos";
import { Newsletter } from "./components/Newsletter";
import { ReservationForm } from "./components/Reservations";

export default function Home() {
  return (
    <>
      <Header />
      <ImageGallery/>
      <VillaInfo
        surface={120}
        bedrooms={6}
        bathrooms={3}
        hasPool={true}
        hasKitchen={true}
      />
      <ReservationForm/>
      <Newsletter />
    </>
  );
}
