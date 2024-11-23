"use client"
import ReservationForm from "./components/ReservationForm";


export default function Home() {
  return (
    <div className=" py-10 min-h-screen bg-gray-100 relative flex items-center justify-center bg-fixed bg-center bg-cover "  style={{
      backgroundImage: `url('/img-home.jpg')`,
    }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-[1000px] mx-auto w-full bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
        <ReservationForm />
      </div>
    </div>
  );
}
