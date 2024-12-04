"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
  isPremium: boolean;
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [dbUser, setDbUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      router.push("/sign-in");
      return;
    }

    // Créer/récupérer l'utilisateur dans la base de données
    const initUser = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
          }),
        });
        
        if (response.ok) {
          const userData = await response.json();
          setDbUser(userData);
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'utilisateur:", error);
      }
    };

    initUser();
  }, [user, isLoaded, router]);

  const handlePremiumUpgrade = async () => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
      });
      
      const data = await response.json();
      
      // Rediriger vers l'URL d'approbation PayPal
      if (data.links) {
        const approvalLink = data.links.find((link: any) => link.rel === "approve");
        if (approvalLink) {
          window.location.href = approvalLink.href;
        }
      }
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
    }
  };

  if (!isLoaded || !dbUser) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Statut : {dbUser.isPremium ? "Premium" : "Normal"}</p>
            {!dbUser.isPremium && (
              <Button onClick={handlePremiumUpgrade}>
                Devenir Premium
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 