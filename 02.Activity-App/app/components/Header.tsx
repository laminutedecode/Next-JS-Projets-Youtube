
export default function Header() {
  return (
    <div className='h-[70vh] bg-cover bg-center' style={{backgroundImage: "url('/home.jpg')"}}>
     
      
      <div className='bg-black bg-opacity-60 w-full h-full flex items-center justify-center flex-col'>
        <h2 className="text-6xl md:text-8xl font-bold text-white">Activity</h2>
        <div className='bg-white w-[2px] h-[100px] my-2'></div>
        <a href="#Content" className='bg-[#ffb129] hover:bg-[#ff6030] p-2 rounded-md text-white font-bold' >Commencer l'aventure</a>
        
      </div>

    </div>
  )
}
