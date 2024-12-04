"use client";

import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogPostInterface } from "@/types/types";

export default function EditBlog({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPostInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const {id} = await params
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          throw new Error("Article non trouvé");
        }
        const data = await response.json();
        setPost(data.post);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      const {id} = await params
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      router.push(`/blog/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!post) return <div className="text-center py-10">Article non trouvé</div>;

  return (
    <section className="container mx-auto py-[50px]">
      <h1 className="text-2xl font-bold mb-8">Edit Blog Post</h1>
      <Form
        initialValues={{
          title: post.title,
          description: post.description,
          category: post.category,
        }}
        onSubmit={handleSubmit}
        submitButtonLabel="Update Post"
        imagePreviewUrl={post.imageUrl}
      />
    </section>
  );
}
