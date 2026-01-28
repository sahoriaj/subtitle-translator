import UserGuideClient from "./client";
import { setRequestLocale } from "next-intl/server"; // Updated import name

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering for metadata
  setRequestLocale(locale);

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
  setRequestLocale(locale);

  return <UserGuideClient />;
}
