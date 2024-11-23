export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const response = await fetch('/api/deleteProducts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      console.log("Produit supprimé avec succès !");
      window.location.reload(); // Recharge la page
    } else {
      const errorData = await response.json();
      console.error("Erreur lors de la suppression du produit:", errorData.error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="text-white bg-red-500 hover:bg-red-700 p-2 rounded-md">
        Supprimer
      </button>
    </form>
  );
}
