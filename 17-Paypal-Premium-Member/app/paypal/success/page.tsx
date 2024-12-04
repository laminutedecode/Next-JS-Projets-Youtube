"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PaypalSuccess() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const updatePremiumStatus = async () => {
      try {
        const response = await fetch("/api/user/upgrade-premium", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du statut premium");
        }

        setIsProcessing(false);
      } catch (error) {
        console.error("Erreur:", error);
        // Gérer l'erreur si nécessaire
      }
    };

    updatePremiumStatus();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h1 className="text-2xl font-bold text-center">
              Paiement réussi !
            </h1>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          {isProcessing ? (
            <p>Traitement de votre paiement en cours...</p>
          ) : (
            <>
              <p className="mb-4">
                Votre compte a été mis à niveau vers Premium avec succès.
              </p>
              <Button onClick={() => router.push("/dashboard")}>
                Retour au tableau de bord
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 