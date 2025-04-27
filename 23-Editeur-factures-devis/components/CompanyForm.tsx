import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { companySchema } from '../schemas';
import { CompanyData, CompanyFormProps } from '../types';

export default function CompanyForm({ onSuccess }: CompanyFormProps) {
  const [existingCompany, setExistingCompany] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CompanyData>({
    resolver: yupResolver(companySchema),
    defaultValues: {
      name: '',
      address: '',
      postalCode: '',
      country: '',
      siret: '',
      iban: '',
      phone: ''
    }
  });

  // Charger les données de la société existante
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch('/api/company');
        if (response.ok) {
          const data = await response.json();
          setExistingCompany(data);
          reset(data); // Remplir le formulaire avec les données existantes
        }
      } catch (error) {
        console.error('Erreur chargement société:', error);
      }
    };
    fetchCompany();
  }, [reset]);

  const onSubmit = async (data: CompanyData) => {
    try {
      console.log('Envoi des données:', data);
      const response = await fetch('/api/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur lors de la soumission');
      
      const result = await response.json();
      console.log('Réponse reçue:', result);
      
      onSuccess();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Erreur lors de la création de la société');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Nom de la société
          </label>
          <input
            {...register('name')}
            className="outline-none border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <input
            {...register('address')}
            className="outline-none border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Code postal
          </label>
          <input
            {...register('postalCode')}
            className="outline-none border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pays
          </label>
          <input
            {...register('country')}
            className="outline-none border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            SIRET
          </label>
          <input
            {...register('siret')}
            className="outline-none border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.siret && (
            <p className="mt-1 text-sm text-red-600">{errors.siret.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            IBAN
          </label>
          <input
            {...register('iban')}
            className="outline-none border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.iban && (
            <p className="mt-1 text-sm text-red-600">{errors.iban.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <input
            {...register('phone')}
            className="outline-none border p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {existingCompany ? 'Mettre à jour' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
} 