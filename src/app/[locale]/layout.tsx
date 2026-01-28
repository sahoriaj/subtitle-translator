import React from "react";
import "@/app/globals.css";
import { Navigation } from "@/app/ui/navigation";
import { getLangDir } from "rtl-detect";
import { setRequestLocale, getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemesProvider from "@/app/ThemesProvider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'google-site-verification': 'your-verification-code-here', // Add your verification code
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);
  const direction = getLangDir(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* Add structured data to clarify site purpose */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Subtitle Translator Tools",
              "applicationCategory": "UtilityApplication",
              "description": "Professional translation tools for subtitles, markdown, and JSON files. No login required.",
              "url": "https://subtitletranslate.us.cc",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }),
          }}
        />
      </head>
      <body>
        <AntdRegistry>
          <NextIntlClientProvider messages={messages}>
            <ThemesProvider>
              <Navigation />
              <main style={{ maxWidth: 1280, width: "100%", marginTop: 8, marginInline: "auto", paddingInline: "clamp(16px, 4vw, 24px)", paddingBlock: 16 }}>{children}</main>
            </ThemesProvider>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
