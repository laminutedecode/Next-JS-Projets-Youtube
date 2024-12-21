import { PrismaClient } from '@prisma/client'
import { User } from '../types/user'

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const users = await prisma.user.findMany()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user: User) => (
            <div key={user.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">{user.prenom} {user.nom}</h2>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <p className="text-gray-600 mb-2">{user.description}</p>
              <p className="text-gray-600 mb-2">Poste: {user.job}</p>
              <p className="text-gray-600 mb-2">
                Technologies: {JSON.parse(user.technologies).join(', ')}
              </p>
              {user.url_github && (
                <a href={user.url_github} className="text-blue-500 hover:underline block">
                  GitHub
                </a>
              )}
              {user.url_youtube && (
                <a href={user.url_youtube} className="text-blue-500 hover:underline block">
                  YouTube
                </a>
              )}
              {user.url_site && (
                <a href={user.url_site} className="text-blue-500 hover:underline block">
                  Site Web
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 