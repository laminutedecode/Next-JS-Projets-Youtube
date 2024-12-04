'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Props } from '../types/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)



export default function FinanceCharts({ entries }: Props) {
  // Séparer les entrées par type
  const incomeEntries = entries.filter(entry => entry.type === 'income')
  const expenseEntries = entries.filter(entry => entry.type === 'expense')

  // Regrouper les revenus par catégorie et calculer le total pour chaque catégorie
const incomeByCategory = incomeEntries.reduce((acc, entry) => {
  // Si la catégorie existe déjà dans l'accumulateur, ajouter le montant actuel au total existant
  // Sinon, initialiser le total à 0 et ajouter le montant actuel
  acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
  return acc; // Retourner l'accumulateur mis à jour
}, {} as Record<string, number>); // Initialiser l'accumulateur comme un objet vide typé avec Record

// Regrouper les dépenses par catégorie et calculer le total pour chaque catégorie
const expenseByCategory = expenseEntries.reduce((acc, entry) => {
  // Même logique que pour les revenus : ajouter ou initialiser le montant par catégorie
  acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
  return acc; // Retourner l'accumulateur mis à jour
}, {} as Record<string, number>); // Initialiser l'accumulateur comme un objet vide typé avec Record


  const colors = {
    income: 'rgba(34, 197, 94, 0.6)', // vert
    expense: 'rgba(239, 68, 68, 0.6)', // rouge
    incomeBorder: 'rgba(34, 197, 94, 1)',
    expenseBorder: 'rgba(239, 68, 68, 1)',
  }

  // Données pour le graphique en barres
  const barData = {
    labels: [...new Set([...Object.keys(incomeByCategory), ...Object.keys(expenseByCategory)])],
    datasets: [
      {
        label: 'Revenus',
        data: Object.values(incomeByCategory),
        backgroundColor: colors.income,
        borderColor: colors.incomeBorder,
        borderWidth: 1,
      },
      {
        label: 'Dépenses',
        data: Object.values(expenseByCategory),
        backgroundColor: colors.expense,
        borderColor: colors.expenseBorder,
        borderWidth: 1,
      },
    ],
  }

 // Données pour le graphique circulaire
const totals = {
  // Calcul du total des revenus
  income: incomeEntries.reduce((sum, entry) => sum + entry.amount, 0),
  // - `incomeEntries` : Tableau contenant toutes les entrées de type "revenu".
  // - `.reduce((sum, entry) => sum + entry.amount, 0)` : Parcourt chaque élément du tableau.
  //   - `sum` : Accumulateur qui garde la somme courante.
  //   - `entry.amount` : Montant de l'entrée actuelle.
  //   - `0` : Valeur initiale de `sum`.
  // Résultat : Somme totale des montants de toutes les entrées de type "revenu".

  // Calcul du total des dépenses
  expense: expenseEntries.reduce((sum, entry) => sum + entry.amount, 0),
  // - `expenseEntries` : Tableau contenant toutes les entrées de type "dépense".
  // - `.reduce((sum, entry) => sum + entry.amount, 0)` : Même logique que pour les revenus.
  // Résultat : Somme totale des montants de toutes les entrées de type "dépense".
};


  const doughnutData = {
    labels: ['Revenus', 'Dépenses'],
    datasets: [{
      data: [totals.income, totals.expense],
      backgroundColor: [colors.income, colors.expense],
      borderColor: [colors.incomeBorder, colors.expenseBorder],
      borderWidth: 1,
    }],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Répartition par Catégorie</h3>
        <Bar
          // Composant Bar de Chart.js utilisé pour afficher un graphique à barres.
          data={barData}
          // Données alimentant le graphique, doivent être structurées au format attendu par Chart.js.

          options={{
            // Options de configuration pour personnaliser le rendu du graphique.
            responsive: true,
            // Rend le graphique responsive pour qu'il s'adapte à la taille de son conteneur.

            plugins: {
              // Configuration des plugins de Chart.js comme la légende et les infobulles (tooltips).

              legend: {
                position: 'top' as const,
                // Positionne la légende au-dessus du graphique.
              },

              tooltip: {
                // Configuration des infobulles affichées au survol des barres.
                callbacks: {
                  // Permet de personnaliser le contenu des infobulles.

                  label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)} €`,
                  // Génère un texte pour l'infobulle. Il inclut :
                  // - Le label du dataset associé à la barre.
                  // - La valeur Y (hauteur de la barre), formatée avec deux décimales suivies d'un symbole euro (€).
                },
              },
            },

            scales: {
              // Configuration des axes du graphique.

              y: {
                // Paramètres pour l'axe Y (valeurs numériques).
                beginAtZero: true,
                // Force l'axe Y à commencer à zéro, même si toutes les valeurs sont supérieures à zéro.

                ticks: {
                  callback: (value) => `${value} €`,
                  // Personnalise l'affichage des ticks (graduations) sur l'axe Y.
                  // Ajoute un symbole euro (€) après chaque valeur.
                },
              },
            },
          }}
        />

      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Revenus vs Dépenses</h3>
        <Doughnut
          // Composant Doughnut de Chart.js utilisé pour afficher un graphique en anneau.
          data={doughnutData}
          // Données utilisées pour alimenter le graphique, doivent être structurées selon le format attendu par Chart.js.

          options={{
            // Options de configuration pour personnaliser le rendu du graphique.
            responsive: true,
            // Permet de rendre le graphique responsive (s'adapte à la taille de son conteneur).

            plugins: {
              // Configuration des plugins de Chart.js, comme la légende et les infobulles (tooltips).

              legend: {
                position: 'bottom' as const,
                // Positionne la légende sous le graphique.
              },

              tooltip: {
                // Configuration des infobulles affichées lorsqu'on survole le graphique.
                callbacks: {
                  // Permet de personnaliser les infobulles.

                  label: (context) => {
                    // Fonction appelée pour chaque segment du graphique afin de générer son texte.

                    const value = context.raw as number;
                    // Récupère la valeur brute (raw) associée au segment actuel.

                    const percentage = ((value / (totals.income + totals.expense)) * 100).toFixed(1);
                    // Calcule le pourcentage du segment actuel par rapport au total des revenus et dépenses.

                    return `${context.label}: ${value.toFixed(2)} € (${percentage}%)`;
                    // Renvoie un texte formaté pour l'infobulle, incluant : 
                    // - le label du segment,
                    // - la valeur numérique,
                    // - le pourcentage correspondant.
                  },
                },
              },
            },
          }}
        />

      </div>
    </div>
  )
} 