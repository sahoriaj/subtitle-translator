export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "subtitle" });

  return {
    title: `${t("title")} - Tools by AI`,
    description: t("description"),
    openGraph: {
      title: `${t("title")} - Tools by AI`,
      description: t("description"),
      type: 'website',
      url: `https://subtitletranslate.us.cc/${locale}`, // ✅ Add locale
    },
    alternates: {
      canonical: `https://subtitletranslate.us.cc/${locale}`, // ✅ ADD THIS
    },
  };
}
