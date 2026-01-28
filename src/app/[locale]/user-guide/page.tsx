import { getTranslations } from "next-intl/server";
import UserGuideClient from "./client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "userGuide" });

  return {
    title: `${t("title")} - Subtitle Translator`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} - Subtitle Translator`,
      description: t("description"),
      type: "website",
      url: "https://subtitletranslate.us.cc",
    },
    alternates: {
      canonical: `https://subtitletranslate.us.cc/${locale}/user-guide`,
    },
  };
}

export default function UserGuidePage() {
  return <UserGuideClient />;
}
