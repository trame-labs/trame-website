// French / English. Copy lives next to the markup as pairs: t('Réserver une démo', 'Book a demo').
import { createContext, useContext } from 'react';

export const LangContext = createContext('fr');

export const useLang = () => useContext(LangContext);

/** Returns t(fr, en): the English string on /en pages, the French one otherwise (or when no English is given yet). */
export function useT() {
  const lang = useLang();
  return (fr, en) => (lang === 'en' && en != null && en !== '' ? en : fr);
}
