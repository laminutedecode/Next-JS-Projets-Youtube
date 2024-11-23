
export type DataType = {
  id: string;
  title: string ;
  description: string ;
  image: string;
  authorName: string;
  authorId: string;
  createdAt: Date;
};
export type DataFormType = {
  title: string ;
  description: string ;
  image?: string;
};

// Exportation du type 'DbContextType' qui représente le contexte de la base de données
export type DbContextType = {
  // Propriété 'articles' qui est un tableau d'objets de type 'DataType'
  articles: DataType[];
  // Méthode 'addArticle' qui prend un objet de type 'DataType' sans la propriété 'id'
  // et retourne une promesse qui se résout sans valeur (Promise<void>)
  addArticle: (membersData: Omit<DataType, 'id'>) => Promise<void>;
  // Méthode 'updateArticle' qui prend un objet de type 'DataType'
  // et retourne une promesse qui se résout sans valeur (Promise<void>)
  updateArticle: (member: DataType) => Promise<void>;

  // Méthode 'deleteArticle' qui prend un identifiant de type 'string'
  // et retourne une promesse qui se résout sans valeur (Promise<void>)
  deleteArticle: (id: string) => Promise<void>;
};



export type Params = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export type UpdatePageProps = {
  params: Params;
}