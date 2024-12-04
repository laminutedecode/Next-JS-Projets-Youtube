import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FormPropsInterface } from "@/types/types";

export default function Form({
  initialValues,
  onSubmit,
  submitButtonLabel,
  imagePreviewUrl,
}: FormPropsInterface) {
  const [formData, setFormData] = useState({
    title: initialValues.title,
    description: initialValues.description,
    category: initialValues.category,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    imagePreviewUrl || null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {  // Vérifie si un fichier a été sélectionné
      const reader = new FileReader();  // Crée une nouvelle instance de FileReader pour lire le fichier
      reader.onload = () => setImagePreview(reader.result as string);  // Lorsque la lecture est terminée, met à jour l'état de l'aperçu de l'image avec les données lues
      reader.readAsDataURL(file);  // Lit le fichier comme une URL de données (base64), ce qui permet d'afficher un aperçu de l'image
    } else {  // Si aucun fichier n'a été sélectionné
      setImagePreview(null);  // Réinitialise l'aperçu de l'image en le mettant à null
    }
    
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    // La méthode append() en JavaScript est utilisée pour ajouter de nouvelles données ou valeurs dans un objet de type FormData. Cette méthode est particulièrement utile lorsque vous devez envoyer des données via une requête HTTP en utilisant la méthode POST ou PUT, notamment dans le cadre de l'envoi de formulaires multipart/form-data (comme ceux contenant des fichiers).
    form.append("description", formData.description);
    form.append("category", formData.category);
    if (image) {
      form.append("image", image);
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        type="text"
        className="rounded-md px-4 w-full py-2 my-2"
      />
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="rounded-md px-4 py-2 w-full my-2"
      />
      <Input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        type="text"
        className="rounded-md px-4 w-full py-2 my-2"
      />
      <div className="my-4">
        <input name="image" type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-4 w-32 h-32 object-cover rounded-md"
          />
        )}
      </div>
      <Button type="submit" className="bg-blue-500 hover:bg-blue-400">
        {submitButtonLabel}
      </Button>
    </form>
  );
}
