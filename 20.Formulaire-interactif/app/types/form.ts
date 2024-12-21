export type FormData = {
  nom: string
  prenom: string
  email: string
  description: string
  url_github?: string
  url_youtube?: string
  url_site?: string
  job: string
  technologies: string[]
}

export const jobOptions = [
  { value: 'frontend', label: 'Développeur Front-end' },
  { value: 'backend', label: 'Développeur Back-end' },
  { value: 'fullstack', label: 'Développeur Full-stack' },
]

export const techOptions = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'php', label: 'PHP' },
  { value: 'sql', label: 'SQL' },
  { value: 'go', label: 'Go' },
  { value: 'python', label: 'Python' },
] 