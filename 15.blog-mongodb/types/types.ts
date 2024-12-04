export interface BlogPostInterface {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface PostGalleryInterface {
  posts: BlogPostInterface[]
}

export interface FormPropsInterface {
  initialValues: {
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonLabel: string;
  imagePreviewUrl?: string;
}