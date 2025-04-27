
import { Company, DocumentListProps, Invoice, Quote } from '../types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import DocumentForm from './DocumentForm';
import DocumentPDF from './DocumentPDF';


export default function DocumentList({ clients }: DocumentListProps) {
  const [showForm, setShowForm] = useState(false);
  const [documentType, setDocumentType] = useState<'invoice' | 'quote' | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<'invoice' | 'quote'>('quote');
  const [selectedDocument, setSelectedDocument] = useState<Quote | Invoice | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Charger les devis
        const quotesRes = await fetch('/api/quotes');
        const quotesData = await quotesRes.json();
        setQuotes(quotesData);
        
        // Charger les factures
        const invoicesRes = await fetch('/api/invoices');
        const invoicesData = await invoicesRes.json();
        setInvoices(invoicesData);
      } catch (error) {
        console.error('Erreur chargement documents:', error);
      }
    };
    
    // Charger les infos de la société
    const fetchCompany = async () => {
      const res = await fetch('/api/company');
      const data = await res.json();
      setCompany(data.company);
    };
    
    fetchDocuments();
    fetchCompany();
  }, []);

  const handleNewDocument = (type: 'invoice' | 'quote') => {
    setDocumentType(type);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    const fetchDocuments = async () => {
      try {
        const quotesRes = await fetch('/api/quotes');
        const invoicesRes = await fetch('/api/invoices');
        setQuotes(await quotesRes.json());
        setInvoices(await invoicesRes.json());
      } catch (error) {
        console.error('Erreur chargement documents:', error);
      }
    };
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
          {company && (activeTab === 'quote' ? quotes : invoices).map((document) => (
            <div 
              key={document.id} 
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              {/* En-tête du document */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">
                    {document.number}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(document.date).toLocaleDateString()}
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
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {document.client.firstName} {document.client.lastName}
                  </p>
                  <p className="text-xs text-gray-600">{document.client.email}</p>
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
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(document, activeTab)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(document.id, activeTab)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                >
                  Supprimer
                </button>
                <PDFDownloadLink
                  document={
                    <DocumentPDF
                      type={documentType!}
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
                  fileName={`${activeTab === 'invoice' ? 'Facture' : 'Devis'}-${document.number}.pdf`}
                  children={
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Télécharger PDF
                    </button>
                  }
                >
                </PDFDownloadLink>
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