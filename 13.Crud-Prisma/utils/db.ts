// Importation de la classe PrismaClient depuis le module @prisma/client
import { PrismaClient } from '@prisma/client'

// Définition d'une fonction singleton pour créer une instance de PrismaClient
const prismaClientSingleton = () => {
  // Création et retour d'une nouvelle instance de PrismaClient
  return new PrismaClient()
}

// Déclaration d'une constante globale pour le contexte global (globalThis)
// Elle inclut une propriété prismaGlobal qui a le type retourné par prismaClientSingleton
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Initialisation de la constante prisma
// Si globalThis.prismaGlobal est défini, elle utilise cette instance, sinon elle crée une nouvelle instance avec prismaClientSingleton
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// Exportation de l'instance prisma par défaut pour l'utiliser dans d'autres parties de l'application
export default prisma

// Si l'environnement d'exécution n'est pas en mode production,
// on assigne l'instance prisma à globalThis.prismaGlobal pour réutilisation future
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
