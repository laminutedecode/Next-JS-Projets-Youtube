"use client";
import { useState } from "react";
import { Mail } from "lucide-react"; 

export function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    try {
      // Vous pouvez remplacer cette partie par une API réelle pour gérer les inscriptions
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Merci pour votre inscription !");
      setEmail("");
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-800 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Inscrivez-vous à notre newsletter</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center">
            <div className="flex items-center bg-gray-700 rounded-md overflow-hidden">
              <Mail className="w-6 h-6 text-gray-400 mx-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                className="bg-gray-700 text-white py-2 px-4 outline-none placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 md:mt-0 md:ml-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-md transition-colors duration-300"
            >
              {isSubmitting ? "Envoi en cours..." : "S'inscrire"}
            </button>
          </form>
          {message && <p className="mt-4 text-lg">{message}</p>}
        </div>
      </div>
    </section>
  );
}
