import UserGuideClient from "./client";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

// Simple translations for the Page Title only (Server Side)
const METADATA_TITLES: Record<string, string> = {
  en: "User Guide",
  zh: "用户指南",
  es: "Guía de Usuario",
  hi: "उपयोगकर्ता गाइड",
  ar: "دليل المستخدم",
  pt: "Guia do Usuário",
  fr: "Guide de l'Utilisateur",
  de: "Benutzerhandbuch",
  ja: "ユーザーガイド",
  ko: "사용자 가이드",
  ru: "Руководство",
  vi: "Hướng dẫn sử dụng",
  th: "คู่มือผู้ใช้",
  tr: "Kullanıcı Rehberi",
  "zh-hant": "使用者指南",
  bn: "ব্যবহার자 নির্দেশিকা",
  id: "Panduan Pengguna",
  it: "Guida Utente"
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  // Get title based on locale, fallback to English
  const title = METADATA_TITLES[locale] || METADATA_TITLES["en"];

  return {
    title: `${title} - Subtitle Translator`,
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
