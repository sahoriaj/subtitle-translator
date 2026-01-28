import TermsClient from "./client";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

// Metadata titles for all 18 languages
const METADATA_TITLES: Record<string, string> = {
  en: "Terms of Service",
  zh: "服务条款",
  es: "Términos de Servicio",
  hi: "सेवा की शर्तें",
  ar: "شروط الخدمة",
  pt: "Termos de Serviço",
  fr: "Conditions d'utilisation",
  de: "Nutzungsbedingungen",
  ja: "利用規約",
  ko: "서비스 약관",
  ru: "Условия использования",
  vi: "Điều khoản dịch vụ",
  th: "เงื่อนไขการให้บริการ",
  tr: "Hizmet Şartları",
  "zh-hant": "服務條款",
  bn: "পরিষেবার শর্তাবলী",
  id: "Syarat Layanan",
  it: "Termini di Servizio"
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
