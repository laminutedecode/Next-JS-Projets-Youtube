export type Entry = {
  id: string 
  type: string
  amount: number
  category: string
  frequency: string
  createdAt: Date
}

export type Props = {
  entries: Entry[]
}

export interface EntryFormProps {
  onAddEntry : (entry: {type: string, amount: string, category: string, frequency: string}) => Promise<void>
}

export interface EntryListProps {
  entries: Entry[];
  isLoading: boolean;
  onDeleteEntry: (id: string) => Promise<void>
}

export type SummaryCardProps = {
  title: string;
  value: number | string;
  isLoading: boolean;
  borderColor: string;
  textColor: string;
}