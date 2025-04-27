import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { Company, DocumentListProps, Invoice, Quote } from '../types';
import DocumentForm from './DocumentForm';
import DocumentPDF from './DocumentPDF';

export default function DocumentList({ clients, onSuccess }: DocumentListProps) {
  const [showForm, setShowForm] = useState(false);
  const [documentType, setDocumentType] = useState<'invoice' | 'quote' | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<'invoice' | 'quote'>('quote');
  const [selectedDocument, setSelectedDocument] = useState<Quote | Invoice | null>(null);

  const fetchDocuments = async () => {
    try {
      console.log('Chargement des documents...');
      
      // Charger les devis
      const quotesRes = await fetch('/api/quotes');
      if (!quotesRes.ok) throw new Error('Erreur chargement devis');
      const quotesData = await quotesRes.json();
      console.log('Devis chargés:', quotesData);
      setQuotes(quotesData);
      
      // Charger les factures
      const invoicesRes = await fetch('/api/invoices');
      if (!invoicesRes.ok) throw new Error('Erreur chargement factures');
      const invoicesData = await invoicesRes.json();
      console.log('Factures chargées:', invoicesData);
      setInvoices(invoicesData);
    } catch (error) {
      console.error('Erreur chargement documents:', error);
    }
  };

  useEffect(() => {
    // Charger les infos de la société
    const fetchCompany = async () => {
      try {
        const res = await fetch('/api/company');
        if (!res.ok) throw new Error('Erreur chargement société');
        const data = await res.json();
        console.log('Société chargée:', data);
        setCompany(data);
      } catch (error) {
        console.error('Erreur chargement société:', error);
      }
    };
    
    fetchDocuments();
    fetchCompany();
  }, []);

  const handleNewDocument = (type: 'invoice' | 'quote') => {
    setDocumentType(type);
    setSelectedDocument(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedDocument(null);
    fetchDocuments();
  };

  const handleDelete = async (id: string, type: 'invoice' | 'quote') => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      try {
        const response = await fetch(`/api/${type}s/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression');
        handleSuccess();
      } catch (error) {
        console.error('Erreur suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleEdit = (document: Quote | Invoice, type: 'invoice' | 'quote') => {
    setDocumentType(type);
    setSelectedDocument(document);
    setShowForm(true);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6 p-6 border-b">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('quote')}
            className={`${
              activeTab === 'quote'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            } px-4 py-2`}
          >
            Devis
          </button>
          <button
            onClick={() => setActiveTab('invoice')}
            className={`${
              activeTab === 'invoice'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            } px-4 py-2`}
          >
            Factures
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleNewDocument('quote')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Nouveau Devis
          </button>
          <button
            onClick={() => handleNewDocument('invoice')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Nouvelle Facture
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl m-4">
            <h3 className="text-lg font-medium mb-4">
              {selectedDocument 
                ? `Modifier ${documentType === 'invoice' ? 'la facture' : 'le devis'}`
                : `${documentType === 'invoice' ? 'Nouvelle Facture' : 'Nouveau Devis'}`
              }
            </h3>
            <DocumentForm
              type={documentType!}
              clients={clients}
              document={selectedDocument}
              onClose={() => {
                setShowForm(false);
                setSelectedDocument(null);
              }}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}

      {/* Liste des documents */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(activeTab === 'quote' ? quotes : invoices).map((document) => (
            <div 
              key={document.id} 
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-medium">
                    {document.client.firstName} {document.client.lastName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {new Date(document.date).toLocaleDateString()}
                  </p>
                  {document.dueDate && (
                    <p className="text-sm text-gray-600">
                      Échéance: {new Date(document.dueDate).toLocaleDateString()}
                    </p>
                  )}
                  {document.validUntil && (
                    <p className="text-sm text-gray-600">
                      Valide jusqu'au: {new Date(document.validUntil).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(document, activeTab)}
                    className="p-2 text-blue-600 hover:text-blue-800"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(document.id, activeTab)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              {/* Aperçu des prestations */}
              <div className="mt-4 space-y-2">
                <h5 className="font-medium">Prestations:</h5>
                <div className="max-h-32 overflow-y-auto">
                  {document.items.map((item, index) => (
                    <div key={index} className="text-sm py-1 border-b">
                      <div className="flex justify-between">
                        <span>{item.description}</span>
                        <span>{item.total.toFixed(2)}€</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {item.quantity} x {item.unitPrice.toFixed(2)}€
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totaux */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Total HT:</span>
                  <span>{document.totalHT.toFixed(2)}€</span>
                </div>
                {document.tva && (
                  <div className="flex justify-between text-sm">
                    <span>TVA ({document.tva}%):</span>
                    <span>{(document.totalHT * document.tva / 100).toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between font-medium mt-2">
                  <span>Total TTC:</span>
                  <span>{document.totalTTC.toFixed(2)}€</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t flex justify-end">
                {company && (
                  <PDFDownloadLink
                    document={
                      <DocumentPDF
                        type={activeTab}
                        number={document.number}
                        date={document.date}
                        dueDate={document.dueDate}
                        validUntil={document.validUntil}
                        company={company}
                        client={document.client}
                        items={document.items}
                        totalHT={document.totalHT}
                        tva={document.tva}
                        totalTTC={document.totalTTC}
                      />
                    }
                    fileName={`${activeTab === 'invoice' ? 'Facture' : 'Devis'}_${document.number}.pdf`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {({ loading }) =>
                      loading ? 'Génération PDF...' : 'Télécharger PDF'
                    }
                  </PDFDownloadLink>
                )}
              </div>
            </div>
          ))}
        </div>

        {(activeTab === 'quote' ? quotes : invoices).length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Aucun document pour le moment</p>
            <p className="text-gray-400 mt-2">
              Commencez par créer {activeTab === 'invoice' ? 'une facture' : 'un devis'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 