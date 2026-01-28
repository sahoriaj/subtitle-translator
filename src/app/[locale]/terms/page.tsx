import TermsClient from "./client";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

// Simple metadata translations
const METADATA_TITLES: Record<string, string> = {
  en: "Terms of Service",
  zh: "服务条款",
  es: "Términos de Servicio",
  hi: "सेवा की शर्तें",
  // ... (Falls back to English for others to save space)
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const title = METADATA_TITLES[locale] || "Terms of Service";

  return {
    title: `${title} - Subtitle Translator`,
    description: "Read our Terms of Service regarding the use of Subtitle Translator.",
    alternates: {
      canonical: `https://subtitletranslate.us.cc/${locale}/terms`,
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <TermsClient />;
}
