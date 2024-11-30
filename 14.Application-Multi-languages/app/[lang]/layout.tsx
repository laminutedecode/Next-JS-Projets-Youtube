import { LangProvider } from '../context/langContext';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await  params; 

  if (!['fr', 'en', 'es'].includes(lang)) {
    throw new Error(`Langue invalide : ${lang}`);
  }

  return (
    <LangProvider defaultLang={lang}>
      {children}
    </LangProvider>
  );
}
