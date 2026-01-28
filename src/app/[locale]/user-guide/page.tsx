import UserGuideClient from "./client";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  
  // Basic metadata without relying on JSON files
  return {
    title: "User Guide - Subtitle Translator",
    description: "Complete guide to using Subtitle Translator efficiently.",
    alternates: {
      canonical: `https://subtitletranslate.us.cc/${locale}/user-guide`,
    },
  };
}

export default async function UserGuidePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return <UserGuideClient />;
}
