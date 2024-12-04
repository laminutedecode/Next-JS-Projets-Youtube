export type Entry = {
  id: string
  type: string
  amount: number
  category: string
  frequency: string
  createdAt: string
}

export type Props = {
  entries: Entry[]
}