"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaypalRejected() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500" />
            <h1 className="text-2xl font-bold text-center">
              Paiement annulé
            </h1>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Le paiement a été annulé ou refusé. Aucun montant n'a été débité.
          </p>
          <div className="space-y-2">
            <Button onClick={() => router.push("/dashboard")}>
              Retour au tableau de bord
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 