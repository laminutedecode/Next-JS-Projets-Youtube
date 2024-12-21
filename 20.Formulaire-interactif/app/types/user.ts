export type User = {
  id: string
  nom: string
  prenom: string
  email: string
  description: string
  url_github: string | null
  url_youtube: string | null
  url_site: string | null
  job: string
  technologies: string
  createdAt: Date
  updatedAt: Date
} 