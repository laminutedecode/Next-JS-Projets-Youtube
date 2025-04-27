
import { DocumentFormProps,DocumentFormData } from '../types';
import { useFieldArray, useForm } from 'react-hook-form';

export default function DocumentForm({ type, clients, document, onClose, onSuccess }: DocumentFormProps) {

  
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<DocumentFormData>({
    defaultValues: document ? {
      clientId: document.clientId,
      date: new Date(document.date).toISOString().split('T')[0],
      dueDate: document.dueDate ? new Date(document.dueDate).toISOString().split('T')[0] : undefined,
      validUntil: document.validUntil ? new Date(document.validUntil).toISOString().split('T')[0] : undefined,
      items: document.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total
      })),
      tva: document.tva || 20,
      totalHT: document.totalHT,
      totalTTC: document.totalTTC
    } : {
      items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
      tva: 20,
      totalHT: 0,
      totalTTC: 0
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const items = watch('items');
  const tva = watch('tva');

  // Calculer les totaux
  const calculateTotals = () => {
    const totalHT = items.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      return sum + (quantity * unitPrice);
    }, 0);
    const totalTTC = tva ? totalHT * (1 + tva / 100) : totalHT;
    
    setValue('totalHT', totalHT);
    setValue('totalTTC', totalTTC);
    console.log('Totaux calculés:', { totalHT, totalTTC, items });
  };

  const onSubmit = async (data: DocumentFormData) => {
    try {
      // Recalculer les totaux avant l'envoi
      const totalHT = data.items.reduce((sum, item) => {
        const quantity = Number(item.quantity) || 0;
        const unitPrice = Number(item.unitPrice) || 0;
        return sum + (quantity * unitPrice);
      }, 0);
      const totalTTC = data.tva ? totalHT * (1 + data.tva / 100) : totalHT;
 
      const formData = {
        ...data,
        totalHT,
        totalTTC,
        items: data.items.map(item => ({
          ...item,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          total: Number(item.quantity) * Number(item.unitPrice)
        }))
      };
 
      console.log('Données à envoyer:', formData);
 
      const response = await fetch(`/api/${type}s${document ? `/${document.id}` : ''}`, {
        method: document ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Erreur lors de ${document ? 'la modification' : 'la création'}`);
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erreur détaillée:', error);
      alert(error instanceof Error ? error.message : `Erreur lors de ${document ? 'la modification' : 'la création'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Client</label>
          <select
            {...register('clientId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Sélectionner un client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {type === 'invoice' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">Date d'échéance</label>
            <input
              type="date"
              {...register('dueDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">Valide jusqu'au</label>
            <input
              type="date"
              {...register('validUntil')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium">Prestations</h4>
          <button
            type="button"
            onClick={() => append({ description: '', quantity: 1, unitPrice: 0, total: 0 })}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          >
            Ajouter une ligne
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-6">
              <input
                {...register(`items.${index}.description`)}
                placeholder="Description"
                className="w-full border rounded p-2"
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                {...register(`items.${index}.quantity`)}
                placeholder="Quantité"
                className="w-full border rounded p-2"
                onChange={(e) => {
                  const value = e.target.value;
                  setValue(`items.${index}.quantity`, Number(value));
                  calculateTotals();
                }}
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                step="0.01"
                {...register(`items.${index}.unitPrice`)}
                placeholder="Prix unitaire"
                className="w-full border rounded p-2"
                onChange={(e) => {
                  const value = e.target.value;
                  setValue(`items.${index}.unitPrice`, Number(value));
                  calculateTotals();
                }}
              />
            </div>
            <div className="col-span-1">
              <p className="p-2 text-gray-600">
                {(items[index]?.quantity || 0) * (items[index]?.unitPrice || 0)}€
              </p>
            </div>
            <div className="col-span-1">
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">TVA (%)</label>
          <input
            type="number"
            step="0.1"
            {...register('tva')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            onChange={() => calculateTotals()}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 text-lg">
        <p>Total HT: {watch('totalHT')}€</p>
        <p>Total TTC: {watch('totalTTC')}€</p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {document 
            ? `Modifier ${type === 'invoice' ? 'la facture' : 'le devis'}`
            : `Créer ${type === 'invoice' ? 'la facture' : 'le devis'}`
          }
        </button>
      </div>
    </form>
  );
} 