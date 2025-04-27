import { Mail, MapPin, Pencil, Phone, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Client, ClientListProps } from '../types';
import ClientForm from './ClientForm';

export default function ClientList({ clients, companyId, onSuccess }: ClientListProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleDelete = async (clientId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        const response = await fetch(`/api/clients/${clientId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression');
        onSuccess();
      } catch (error) {
        console.error('Erreur suppression client:', error);
      }
    }
  };

  const handleEdit = (client: Client) => {
    console.log("Client à modifier:", client);
    setSelectedClient(client);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedClient(null);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6 p-6 border-b">
        <h3 className="text-xl font-semibold text-gray-900">Liste des clients</h3>
        <button
          onClick={() => {
            setSelectedClient(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 gap-2"
        >
          Ajouter un client
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl m-4">
            <h3 className="text-lg font-medium mb-4">
              {selectedClient ? 'Modifier le client' : 'Nouveau client'}
            </h3>
            <ClientForm 
              onClose={handleCloseForm} 
              companyId={companyId} 
              client={selectedClient}
              onSuccess={() => {
                onSuccess();
                handleCloseForm();
              }} 
            />
          </div>
        </div>
      )}

      <div className="p-6">
        {clients.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Aucun client pour le moment</p>
            <p className="text-gray-400 mt-2">Commencez par ajouter votre premier client</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <div
                key={client.id}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 group relative"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                  <button
                    onClick={() => handleEdit(client)}
                    className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="p-1 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600">
                  {client.firstName} {client.lastName}
                </h4>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {client.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {client.phone}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {client.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 