export type LangContextType = {
  lang: string;
  setLang: (lang: string) => void;
}

export type ImageUrlsData = {
  hero: string;
  destinations: Record<string, string>;
  features: Record<string, string>;
  gallery: string[];
};

export type Translations = {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  destinations: {
    title:  string;
    [key: string] : string | Destination;
  };
  features : {
    title: string;
    [key: string] : string | Feature;
  };
  cta: {
    title:  string;
    subtitle: string;
    button: string;
  };
  footer: {
    rights: string;
    privacy?: string;
    contact: string;
    about: string;
    terms: string
  }
}

export type Destination  = {
  title: string;
  description: string;
}
export type Feature  = {
  title: string;
  description: string;
}