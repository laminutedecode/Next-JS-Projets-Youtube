import Image from "next/image";
import { FaMapMarkerAlt, FaCalendar  } from "react-icons/fa";


const Card = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md cursor-pointer border hover:translate-y-[-10px] transition-all hover:border-[#ff6030] ">
      <Image alt={data.title} src={data.image} width={300} height={400} className="w-full h-[400px] rounded-md object-cover" />
      <h2 className="text-xl font-bold mt-2">{data.title}</h2>
      <div className="flex items-center gap-2 text-[#ff6030] text-[14px] my-2">
        <FaMapMarkerAlt/>
        <p>{data.lieu}</p>
      </div>
      <div className="flex items-center gap-2 text-[#3056ff] text-[14px] my-2">
        <FaCalendar />
        <p>Prochaine session le: {data.session}</p>
      </div>
      <p className="text-gray-700">{data.desc}</p>
    </div>
  );
};

export default Card;
