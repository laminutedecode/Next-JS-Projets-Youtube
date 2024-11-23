import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";

type ReservationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numPeople: number;
  arrivalTime: string;
  reservationDate: string;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Le prénom est requis"),
  lastName: Yup.string().required("Le nom est requis"),
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  phone: Yup.string().required("Le numéro de téléphone est requis"),
  numPeople: Yup.number()
    .positive("Doit être un nombre positif")
    .integer("Doit être un entier")
    .required("Le nombre de personnes est requis"),
  arrivalTime: Yup.string().required("L'heure d'arrivée est requise"),
  reservationDate: Yup.string().required("La date de réservation est requise"),
});

const ReservationForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReservationFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: ReservationFormValues) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Réservation effectuée avec succès !");
        reset();
      } else {
        setMessage(result.error || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de la soumission du formulaire.");
    }
  };

  return (
    <form className="w-full p-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-4xl mb-4 uppercase font-black">Réservation</h2>
      {message && <p className="text-green-500 bg-green-100 p-3 rounded mb-4">{message}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Prénom:</label>
        <input
          type="text"
          {...register('firstName')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.firstName && <p className="text-red-500 text-xs italic bg-red-100 p-3 my-2 rounded-md">{errors.firstName.message}</p>}
      </div>

  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
        <input
          type="text"
          {...register('lastName')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.lastName && <p className="text-red-500 text-xs italic bg-red-100 p-3 my-2 rounded-md">{errors.lastName.message}</p>}
      </div>

     
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input
          type="email"
          {...register('email')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.email && <p className="text-red-500 text-xs italic bg-red-100 p-3 my-2 rounded-md">{errors.email.message}</p>}
      </div>

   
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Téléphone:</label>
        <input
          type="tel"
          {...register('phone')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.phone && <p className="text-red-500 text-xs italic bg-red-100 p-3 my-2 rounded-md">{errors.phone.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de personnes:</label>
        <input
          type="number"
          {...register('numPeople')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.numPeople && <p className="text-red-500 text-xs italic bg-red-100 p-3 my-2 rounded-md">{errors.numPeople.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Date de réservation:</label>
        <input
          type="date"
          {...register('reservationDate')}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {errors.reservationDate && <p className="text-red-500 text-xs italic bg-red-100 p-3 my-2 rounded-md">{errors.reservationDate.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Heure d'arrivée:</label>
        <select {...register('arrivalTime')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Sélectionnez une heure</option>
          {['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {errors.arrivalTime && <p className="text-red-500 text-xs italic bg-red-100 p-3 my-2 rounded-md">{errors.arrivalTime.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Réserver
      </button>
    </form>
  );
};

export default ReservationForm;
