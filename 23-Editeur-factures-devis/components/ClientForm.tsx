import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { clientSchema } from '../schemas';
import { ClientData, ClientFormProps } from '../types';

export default function ClientForm({ onClose, companyId, client, onSuccess }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<ClientData>({
    resolver: yupResolver(clientSchema),
    defaultValues: {
      firstName: client?.firstName || '',
      lastName: client?.lastName || '',
      email: client?.email || '',
      phone: client?.phone || '',
      address: client?.address || ''
    }
  });

  useEffect(() => {
    if (client) {
      setValue('firstName', client.firstName);
      setValue('lastName', client.lastName);
      setValue('email', client.email);
      setValue('phone', client.phone);
      setValue('address', client.address);
    }
  }, [client, setValue]);

  const onSubmit = async (data: ClientData) => {
    try {
      console.log('Envoi des données:', { ...data, companyId, id: client?.id });
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          companyId,
          id: client?.id
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création du client');
      }
      
      const result = await response.json();
      console.log('Réponse reçue:', result);
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erreur client:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors de la création du client');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            {...register('firstName')}
            className="border p-2 outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            {...register('lastName')}
            className="border p-2 outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <input
            {...register('address')}
            className="border p-2 outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <input
            {...register('phone')}
            className="border p-2 outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            className="border p-2 outline-none mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
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
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {client ? 'Modifier le client' : 'Ajouter le client'}
        </button>
      </div>
    </form>
  );
} 