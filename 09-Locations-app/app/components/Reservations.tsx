"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckCircle2Icon } from "lucide-react";

const PRICE_PER_NIGHT = 130;

export function ReservationForm() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (endDate && date && date > endDate) {
      setEndDate(undefined);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (startDate && date && date >= startDate) {
      setEndDate(date);
    }
  };

  const calculateNights = () => {
    if (startDate && endDate) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }
    return 0;
  };

  const totalNights = calculateNights();
  const totalPrice = totalNights * PRICE_PER_NIGHT;

  const handleReservation = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 bg-white rounded-xl space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Réservez votre séjour</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="text-gray-500 w-5 h-5" />
          <p className="font-medium text-lg text-gray-700">Sélectionnez vos dates :</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8  max-w-xl mx-auto">
          <div>
            <p className="text-sm font-medium text-gray-600">Date de début :</p>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleStartDateSelect}
              className="rounded-md border shadow-sm mt-2"
            />
          </div>
          {startDate && (
            <div>
              <p className="text-sm font-medium text-gray-600">Date de fin :</p>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateSelect}
                className="rounded-md border shadow-sm mt-2"
              />
            </div>
          )}
        </div>
      </div>

      {totalNights > 0 && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded-lg">
          <p className="text-lg font-semibold">{`Nombre de nuits : ${totalNights}`}</p>
          <p className="text-lg">{`Prix total : ${totalPrice}€`}</p>
        </div>
      )}

      <Button
        onClick={handleReservation}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg "
        disabled={!startDate || !endDate || isSubmitted}
      >
        {isSubmitted ? (
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2Icon className="w-5 h-5 text-green-400" />
            <span>Réservation confirmée</span>
          </div>
        ) : (
          "Réserver"
        )}
      </Button>

      {isSubmitted && (
        <p className="mt-4 text-center text-green-600 font-medium">
          Votre réservation a été confirmée !
        </p>
      )}
    </div>
  );
}
