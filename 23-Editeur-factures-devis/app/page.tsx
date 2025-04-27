'use client';
import ClientList from '../components/ClientList';
import CompanyForm from '../components/CompanyForm';
import DocumentList from '../components/DocumentList';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'company' | 'clients' | 'documents'>('company');
  const [clients, setClients] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    // Charger la liste des clients
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => {
        setClients(data);
      })
      .catch(error => console.error('Fetch error:', error));
  }, [refresh]);

  const handleUpdate = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        
        <div className="border-b border-gray-200 mt-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('company')}
              className={`${
                activeTab === 'company'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Société
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`${
                activeTab === 'clients'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Clients
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Devis et Factures
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'company' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Informations de la société</h2>
              <CompanyForm onSuccess={handleUpdate} />
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Clients</h2>
              <ClientList 
                clients={clients}
                companyId="default-company"
                onSuccess={handleUpdate}
              />
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Devis et Factures</h2>
              <DocumentList 
                clients={clients}
                onSuccess={handleUpdate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
