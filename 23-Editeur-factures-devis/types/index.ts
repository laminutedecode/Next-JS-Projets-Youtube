export interface Company {
  id: string;
  name: string;
  logo?: string;
  address: string;
  postalCode: string;
  country: string;
  siret: string;
  iban: string;
  phone: string;
  clients: Client[];
}

export interface CompanyData {
  name?: string;
  address?: string;
  postalCode?: string;
  country?: string;
  siret?: string;
  iban?: string;
  phone?: string;
}

export interface CompanyFormProps {
  company?: Company | null;
  onSuccess: () => void;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  companyId: string;
}

export interface ClientData {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface ClientFormProps {
  onClose: () => void;
  companyId: string;
  client: Client | null;
  onSuccess: () => void;
}

export interface ClientListProps {
  clients: Client[];
  companyId: string | undefined;
  onSuccess: () => void;
}

export interface Document {
  id: string;
  number: string;
  date: string;
  dueDate?: string;
  validUntil?: string;
  clientId: string;
  client: Client;
  items: DocumentItem[];
  totalHT: number;
  tva?: number;
  totalTTC: number;
}

export interface Quote extends Document {
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
}

export interface Invoice extends Document {
  status: 'DRAFT' | 'SENT' | 'PAID';
}


export interface DocumentItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface DocumentFormData {
  clientId: string;
  date: string;
  dueDate?: string;
  validUntil?: string;
  items: DocumentItem[];
  tva?: number;
  totalHT: number;
  totalTTC: number;
}

export interface DocumentFormProps {
  type: 'invoice' | 'quote';
  clients: Client[];
  document?: Quote | Invoice | null;
  onClose: () => void;
  onSuccess: () => void;
}

export interface DocumentListProps {
  clients: Client[];
  onSuccess: () => void;
}

export interface DocumentPDFProps {
  type: 'invoice' | 'quote';
  number: string;
  date: string;
  dueDate?: string;
  validUntil?: string;
  company: Company;
  client: Client;
  items: DocumentItem[];
  totalHT: number;
  tva?: number;
  totalTTC: number;
}

