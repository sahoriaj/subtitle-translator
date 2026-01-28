"use client";

import React from "react";
import { Typography, Card, Space, Divider, Collapse, Alert, Steps, Button, Tag } from "antd";
import {
  FileTextOutlined,
  ApiOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const { Title, Paragraph, Text } = Typography;

// ==========================================
// ALL TRANSLATIONS (18 Languages)
// ==========================================
const TRANSLATIONS: any = {
  // 1. English
  en: {
    title: "User Guide",
    subtitle: "Complete guide to using Subtitle Translator efficiently.",
    navTitle: "Quick Navigation",
    quickStart: "Quick Start",
    features: "Features",
    formats: "Formats",
    apis: "APIs",
    faq: "FAQ",
    steps: [
      { title: "Upload Subtitle", desc: "Drag & drop .srt, .ass, .vtt, or .lrc files." },
      { title: "Select Languages", desc: "Choose source and target languages (60+ supported)." },
      { title: "Configure API", desc: "Choose Free Google Translate or Premium (DeepL/OpenAI)." },
      { title: "Translate & Export", desc: "Process and download your new subtitles." }
    ],
    featuresList: [
      { title: "Batch Processing", desc: "Translate multiple files at once automatically." },
      { title: "Timeline Preservation", desc: "Keeps exact timestamps and formatting." },
      { title: "Bilingual Subtitles", desc: "Show original and translated text together." },
      { title: "Privacy First", desc: "Files processed locally. API keys stored in browser." }
    ],
    formatsList: [
      { name: "SRT", desc: "Most common format. Compatible with everything." },
      { name: "ASS", desc: "Advanced styling (fonts, colors, positioning)." },
      { name: "VTT", desc: "Web standard for HTML5 players." },
      { name: "LRC", desc: "Lyrics format for music." }
    ],
    apisList: [
      { name: "Google", desc: "Completely free, no key required.", tag: "Free" },
      { name: "DeepL Pro", desc: "Best accuracy, natural nuance.", tag: "Key Required" },
      { name: "OpenAI", desc: "Context-aware AI translation.", tag: "Key Required" }
    ],
    faqList: [
      { q: "Is it free?", a: "Yes! The tool is free. Premium APIs (DeepL) need your own key." },
      { q: "Is my data safe?", a: "Yes, all processing happens in your browser." }
    ],
    cta: { title: "Ready?", btn: "Start Translating" }
  },

  // 2. Simplified Chinese (zh)
  zh: {
    title: "用户指南",
    subtitle: "字幕翻译器完整使用指南，助您高效翻译。",
    navTitle: "快速导航",
    quickStart: "快速开始",
    features: "核心功能",
    formats: "支持格式",
    apis: "翻译接口",
    faq: "常见问题",
    steps: [
      { title: "上传字幕", desc: "拖放 .srt, .ass, .vtt 或 .lrc 文件。" },
      { title: "选择语言", desc: "选择源语言和目标语言（支持 60+ 种）。" },
      { title: "配置 API", desc: "选择免费谷歌翻译或高级服务 (DeepL/OpenAI)。" },
      { title: "翻译并导出", desc: "处理并下载您的新字幕文件。" }
    ],
    featuresList: [
      { title: "批量处理", desc: "一次自动翻译多个文件。" },
      { title: "时间轴保留", desc: "精准保持原始时间戳和格式。" },
      { title: "双语字幕", desc: "同时显示原文和译文。" },
      { title: "隐私优先", desc: "本地处理文件，API 密钥存储在浏览器中。" }
    ],
    formatsList: [
      { name: "SRT", desc: "最通用的格式，兼容性最好。" },
      { name: "ASS", desc: "支持高级样式（字体、颜色、位置）。" },
      { name: "VTT", desc: "HTML5 播放器的网页标准。" },
      { name: "LRC", desc: "用于音乐的歌词格式。" }
    ],
    apisList: [
      { name: "Google", desc: "完全免费，无需密钥。", tag: "免费" },
      { name: "DeepL Pro", desc: "准确度最高，语气自然。", tag: "需要密钥" },
      { name: "OpenAI", desc: "支持上下文理解的 AI 翻译。", tag: "需要密钥" }
    ],
    faqList: [
      { q: "是免费的吗？", a: "是的！工具本身免费。高级 API (DeepL) 需要您自己的密钥。" },
      { q: "我的数据安全吗？", a: "安全，所有处理均在您的浏览器本地进行。" }
    ],
    cta: { title: "准备好了吗？", btn: "开始翻译" }
  },

  // 3. Spanish (es)
  es: {
    title: "Guía de Usuario",
    subtitle: "Guía completa para usar el Traductor de Subtítulos.",
    navTitle: "Navegación Rápida",
    quickStart: "Inicio Rápido",
    features: "Características",
    formats: "Formatos",
    apis: "APIs",
    faq: "Preguntas Frecuentes",
    steps: [
      { title: "Subir Subtítulo", desc: "Arrastra archivos .srt, .ass, .vtt o .lrc." },
      { title: "Seleccionar Idiomas", desc: "Elige idiomas de origen y destino." },
      { title: "Configurar API", desc: "Usa Google Gratis o Premium (DeepL/OpenAI)." },
      { title: "Traducir y Exportar", desc: "Procesa y descarga tus nuevos subtítulos." }
    ],
    featuresList: [
      { title: "Procesamiento por Lotes", desc: "Traduce múltiples archivos a la vez." },
      { title: "Preservación de Tiempos", desc: "Mantiene las marcas de tiempo exactas." },
      { title: "Subtítulos Bilingües", desc: "Muestra texto original y traducido." },
      { title: "Privacidad", desc: "Archivos procesados localmente." }
    ],
    formatsList: [
      { name: "SRT", desc: "Formato más común." },
      { name: "ASS", desc: "Estilos avanzados." },
      { name: "VTT", desc: "Estándar web." },
      { name: "LRC", desc: "Letras de canciones." }
    ],
    apisList: [
      { name: "Google", desc: "Gratis, sin clave.", tag: "Gratis" },
      { name: "DeepL Pro", desc: "Alta precisión.", tag: "Requiere Clave" },
      { name: "OpenAI", desc: "IA con contexto.", tag: "Requiere Clave" }
    ],
    faqList: [
      { q: "¿Es gratis?", a: "¡Sí! La herramienta es gratis." },
      { q: "¿Mis datos están seguros?", a: "Sí, todo se procesa en tu navegador." }
    ],
    cta: { title: "¿Listo?", btn: "Empezar" }
  },

  // 4. Hindi (hi)
  hi: {
    title: "उपयोगकर्ता गाइड",
    subtitle: "सबटाइटल ट्रांसलेटर का कुशलतापूर्वक उपयोग करने के लिए पूरी गाइड।",
    navTitle: "त्वरित नेविगेशन",
    quickStart: "त्वरित आरंभ",
    features: "विशेषताएं",
    formats: "प्रारूप (Formats)",
    apis: "APIs",
    faq: "सामान्य प्रश्न",
    steps: [
      { title: "सबटाइटल अपलोड करें", desc: ".srt, .ass, .vtt, या .lrc फाइलें खींचें और छोड़ें।" },
      { title: "भाषा चुनें", desc: "स्रोत और लक्ष्य भाषा चुनें।" },
      { title: "API कॉन्फ़िगर करें", desc: "निःशुल्क Google या प्रीमियम (DeepL/OpenAI) चुनें।" },
      { title: "अनुवाद और निर्यात", desc: "अपनी नई सबटाइटल फाइल डाउनलोड करें।" }
    ],
    featuresList: [
      { title: "बैच प्रोसेसिंग", desc: "एक साथ कई फाइलों का अनुवाद करें।" },
      { title: "समय संरक्षण", desc: "सटीक टाइमस्टैम्प बनाए रखता है।" },
      { title: "द्विभाषी सबटाइटल", desc: "मूल और अनुवादित पाठ एक साथ दिखाएं।" },
      { title: "गोपनीयता", desc: "फाइलें आपके ब्राउज़र में सुरक्षित रहती हैं।" }
    ],
    formatsList: [
      { name: "SRT", desc: "सबसे सामान्य प्रारूप।" },
      { name: "ASS", desc: "उन्नत स्टाइलिंग।" },
      { name: "VTT", desc: "वेब मानक।" },
      { name: "LRC", desc: "गीतों के बोल।" }
    ],
    apisList: [
      { name: "Google", desc: "पूरी तरह से मुफ़्त।", tag: "मुफ़्त" },
      { name: "DeepL Pro", desc: "सर्वोत्तम सटीकता।", tag: "की (Key) आवश्यक" },
      { name: "OpenAI", desc: "संदर्भ-जागरूक AI।", tag: "की (Key) आवश्यक" }
    ],
    faqList: [
      { q: "क्या यह मुफ़्त है?", a: "हाँ! टूल मुफ़्त है।" },
      { q: "क्या मेरा डेटा सुरक्षित है?", a: "हाँ, सब कुछ आपके ब्राउज़र में प्रोसेस होता है।" }
    ],
    cta: { title: "तैयार हैं?", btn: "अनुवाद शुरू करें" }
  },

  // 5. Arabic (ar)
  ar: {
    title: "دليل المستخدم",
    subtitle: "الدليل الكامل لاستخدام مترجم الترجمة بكفاءة.",
    navTitle: "تصفح سريع",
    quickStart: "البداية السريعة",
    features: "المميزات",
    formats: "الصيغ",
    apis: "واجهات برمجة التطبيقات",
    faq: "الأسئلة الشائعة",
    steps: [
      { title: "رفع ملف الترجمة", desc: "اسحب وأفلت ملفات .srt, .ass, .vtt, .lrc" },
      { title: "اختر اللغات", desc: "اختر لغة المصدر والهدف." },
      { title: "إعداد API", desc: "اختر Google المجاني أو (DeepL/OpenAI) المدفوع." },
      { title: "ترجمة وتصدير", desc: "حمل ملف الترجمة الجديد." }
    ],
    featuresList: [
      { title: "معالجة مجمعة", desc: "ترجمة ملفات متعددة في وقت واحد." },
      { title: "الحفاظ على التوقيت", desc: "يحافظ على الطوابع الزمنية بدقة." },
      { title: "ترجمة ثنائية اللغة", desc: "إظهار النص الأصلي والمترجم معاً." },
      { title: "الخصوصية أولاً", desc: "تتم معالجة الملفات محلياً في متصفحك." }
    ],
    formatsList: [
      { name: "SRT", desc: "الصيغة الأكثر شيوعاً." },
      { name: "ASS", desc: "تنسيق متقدم." },
      { name: "VTT", desc: "معيار الويب." },
      { name: "LRC", desc: "كلمات الأغاني." }
    ],
    apisList: [
      { name: "Google", desc: "مجاني تماماً.", tag: "مجاني" },
      { name: "DeepL Pro", desc: "أفضل دقة.", tag: "يتطلب مفتاح" },
      { name: "OpenAI", desc: "ترجمة ذكية بالسياق.", tag: "يتطلب مفتاح" }
    ],
    faqList: [
      { q: "هل هو مجاني؟", a: "نعم! الأداة مجانية." },
      { q: "هل بياناتي آمنة؟", a: "نعم، تتم المعالجة في متصفحك." }
    ],
    cta: { title: "جاهز؟", btn: "ابدأ الترجمة" }
  },

  // 6. Portuguese (pt)
  pt: {
    title: "Guia do Usuário",
    subtitle: "Guia completo para usar o Tradutor de Legendas.",
    navTitle: "Navegação Rápida",
    quickStart: "Início Rápido",
    features: "Recursos",
    formats: "Formatos",
    apis: "APIs",
    faq: "FAQ",
    steps: [
      { title: "Enviar Legenda", desc: "Arraste arquivos .srt, .ass, .vtt ou .lrc." },
      { title: "Selecionar Idiomas", desc: "Escolha idiomas de origem e destino." },
      { title: "Configurar API", desc: "Use Google Grátis ou Premium (DeepL/OpenAI)." },
      { title: "Traduzir e Exportar", desc: "Baixe suas novas legendas." }
    ],
    featuresList: [
      { title: "Processamento em Lote", desc: "Traduza vários arquivos de uma vez." },
      { title: "Preservação de Tempo", desc: "Mantém carimbos de tempo exatos." },
      { title: "Legendas Bilíngues", desc: "Mostra texto original e traduzido." },
      { title: "Privacidade", desc: "Arquivos processados localmente." }
    ],
    formatsList: [
      { name: "SRT", desc: "Formato mais comum." },
      { name: "ASS", desc: "Estilo avançado." },
      { name: "VTT", desc: "Padrão web." },
      { name: "LRC", desc: "Letras de música." }
    ],
    apisList: [
      { name: "Google", desc: "Totalmente grátis.", tag: "Grátis" },
      { name: "DeepL Pro", desc: "Melhor precisão.", tag: "Requer Chave" },
      { name: "OpenAI", desc: "Tradução com contexto.", tag: "Requer Chave" }
    ],
    faqList: [
      { q: "É gratuito?", a: "Sim! A ferramenta é gratuita." },
      { q: "Meus dados estão seguros?", a: "Sim, tudo é processado no seu navegador." }
    ],
    cta: { title: "Pronto?", btn: "Começar a Traduzir" }
  },

  // 7. French (fr)
  fr: {
    title: "Guide de l'Utilisateur",
    subtitle: "Guide complet pour utiliser le Traducteur de Sous-titres.",
    navTitle: "Navigation Rapide",
    quickStart: "Démarrage Rapide",
    features: "Fonctionnalités",
    formats: "Formats",
    apis: "APIs",
    faq: "FAQ",
    steps: [
      { title: "Télécharger", desc: "Glissez-déposez des fichiers .srt, .ass, .vtt." },
      { title: "Choisir les Langues", desc: "Sélectionnez la source et la cible." },
      { title: "Configurer l'API", desc: "Google Gratuit ou Premium (DeepL/OpenAI)." },
      { title: "Traduire", desc: "Téléchargez vos nouveaux sous-titres." }
    ],
    featuresList: [
      { title: "Traitement par Lots", desc: "Traduisez plusieurs fichiers à la fois." },
      { title: "Chronologie", desc: "Conserve les codes temporels exacts." },
      { title: "Bilingue", desc: "Affiche le texte original et traduit." },
      { title: "Confidentialité", desc: "Traitement local dans le navigateur." }
    ],
    formatsList: [
      { name: "SRT", desc: "Le plus courant." },
      { name: "ASS", desc: "Style avancé." },
      { name: "VTT", desc: "Standard Web." },
      { name: "LRC", desc: "Paroles." }
    ],
    apisList: [
      { name: "Google", desc: "Gratuit.", tag: "Gratuit" },
      { name: "DeepL Pro", desc: "Meilleure précision.", tag: "Clé Requise" },
      { name: "OpenAI", desc: "IA contextuelle.", tag: "Clé Requise" }
    ],
    faqList: [
      { q: "Est-ce gratuit ?", a: "Oui, l'outil est gratuit." },
      { q: "Mes données sont-elles sûres ?", a: "Oui, tout reste dans votre navigateur." }
    ],
    cta: { title: "Prêt ?", btn: "Commencer" }
  },

  // 8. German (de)
  de: {
    title: "Benutzerhandbuch",
    subtitle: "Vollständige Anleitung zur Nutzung des Untertitel-Übersetzers.",
    navTitle: "Schnellnavigation",
    quickStart: "Schnellstart",
    features: "Funktionen",
    formats: "Formate",
    apis: "APIs",
    faq: "FAQ",
    steps: [
      { title: "Untertitel hochladen", desc: "Ziehen Sie .srt, .ass oder .vtt Dateien." },
      { title: "Sprachen wählen", desc: "Wählen Sie Quell- und Zielsprache." },
      { title: "API konfigurieren", desc: "Google (Kostenlos) oder DeepL/OpenAI." },
      { title: "Übersetzen", desc: "Laden Sie Ihre neuen Untertitel herunter." }
    ],
    featuresList: [
      { title: "Stapelverarbeitung", desc: "Mehrere Dateien gleichzeitig übersetzen." },
      { title: "Zeitstempel", desc: "Behält exakte Zeitangaben bei." },
      { title: "Zweisprachig", desc: "Original und Übersetzung anzeigen." },
      { title: "Datenschutz", desc: "Lokale Verarbeitung im Browser." }
    ],
    formatsList: [
      { name: "SRT", desc: "Am häufigsten." },
      { name: "ASS", desc: "Erweitertes Styling." },
      { name: "VTT", desc: "Web-Standard." },
      { name: "LRC", desc: "Liedtexte." }
    ],
    apisList: [
      { name: "Google", desc: "Kostenlos.", tag: "Gratis" },
      { name: "DeepL Pro", desc: "Beste Genauigkeit.", tag: "Key Erforderlich" },
      { name: "OpenAI", desc: "Kontext-KI.", tag: "Key Erforderlich" }
    ],
    faqList: [
      { q: "Ist es kostenlos?", a: "Ja, das Tool ist kostenlos." },
      { q: "Sind meine Daten sicher?", a: "Ja, alles wird lokal verarbeitet." }
    ],
    cta: { title: "Bereit?", btn: "Jetzt übersetzen" }
  },

  // 9. Japanese (ja)
  ja: {
    title: "ユーザーガイド",
    subtitle: "字幕翻訳ツールの完全ガイド。",
    navTitle: "クイックナビ",
    quickStart: "クイックスタート",
    features: "特徴",
    formats: "対応形式",
    apis: "API",
    faq: "よくある質問",
    steps: [
      { title: "字幕をアップロード", desc: ".srt, .ass, .vttファイルをドラッグ＆ドロップ。" },
      { title: "言語を選択", desc: "翻訳元と翻訳先の言語を選択。" },
      { title: "API設定", desc: "無料のGoogleまたはDeepL/OpenAIを選択。" },
      { title: "翻訳して保存", desc: "新しい字幕ファイルをダウンロード。" }
    ],
    featuresList: [
      { title: "一括処理", desc: "複数のファイルを一度に翻訳。" },
      { title: "タイムライン保持", desc: "正確なタイミングを維持します。" },
      { title: "二言語字幕", desc: "原文と訳文を同時に表示。" },
      { title: "プライバシー", desc: "ブラウザ内でローカル処理されます。" }
    ],
    formatsList: [
      { name: "SRT", desc: "最も一般的。" },
      { name: "ASS", desc: "高度なスタイル対応。" },
      { name: "VTT", desc: "Web標準。" },
      { name: "LRC", desc: "歌詞ファイル。" }
    ],
    apisList: [
      { name: "Google", desc: "完全無料。", tag: "無料" },
      { name: "DeepL Pro", desc: "最高精度。", tag: "キー必須" },
      { name: "OpenAI", desc: "AI翻訳。", tag: "キー必須" }
    ],
    faqList: [
      { q: "無料ですか？", a: "はい、ツールは無料です。" },
      { q: "データは安全ですか？", a: "はい、すべてブラウザで処理されます。" }
    ],
    cta: { title: "準備完了？", btn: "翻訳を開始" }
  },

  // 10. Korean (ko)
  ko: {
    title: "사용자 가이드",
    subtitle: "자막 번역기 사용을 위한 전체 가이드.",
    navTitle: "빠른 탐색",
    quickStart: "빠른 시작",
    features: "기능",
    formats: "형식",
    apis: "API",
    faq: "자주 묻는 질문",
    steps: [
      { title: "자막 업로드", desc: ".srt, .ass, .vtt 파일을 드래그 앤 드롭." },
      { title: "언어 선택", desc: "원본 및 대상 언어 선택." },
      { title: "API 구성", desc: "무료 Google 또는 DeepL/OpenAI 선택." },
      { title: "번역 및 내보내기", desc: "새 자막 파일 다운로드." }
    ],
    featuresList: [
      { title: "일괄 처리", desc: "여러 파일을 한 번에 번역." },
      { title: "타임라인 보존", desc: "정확한 타임스탬프 유지." },
      { title: "이중 언어 자막", desc: "원본과 번역본 동시 표시." },
      { title: "개인정보 보호", desc: "브라우저에서 로컬로 처리." }
    ],
    formatsList: [
      { name: "SRT", desc: "가장 일반적임." },
      { name: "ASS", desc: "고급 스타일링." },
      { name: "VTT", desc: "웹 표준." },
      { name: "LRC", desc: "가사." }
    ],
    apisList: [
      { name: "Google", desc: "완전 무료.", tag: "무료" },
      { name: "DeepL Pro", desc: "최고의 정확도.", tag: "키 필요" },
      { name: "OpenAI", desc: "AI 번역.", tag: "키 필요" }
    ],
    faqList: [
      { q: "무료인가요?", a: "네, 도구는 무료입니다." },
      { q: "데이터는 안전한가요?", a: "네, 모두 브라우저에서 처리됩니다." }
    ],
    cta: { title: "준비되셨나요?", btn: "번역 시작" }
  },

  // 11. Russian (ru)
  ru: {
    title: "Руководство",
    subtitle: "Полное руководство по использованию переводчика субтитров.",
    navTitle: "Навигация",
    quickStart: "Быстрый старт",
    features: "Функции",
    formats: "Форматы",
    apis: "API",
    faq: "FAQ",
    steps: [
      { title: "Загрузить", desc: "Перетащите файлы .srt, .ass, .vtt." },
      { title: "Выбрать языки", desc: "Выберите исходный и целевой языки." },
      { title: "Настроить API", desc: "Google (бесплатно) или DeepL/OpenAI." },
      { title: "Перевести", desc: "Скачайте новые субтитры." }
    ],
    featuresList: [
      { title: "Пакетная обработка", desc: "Перевод нескольких файлов сразу." },
      { title: "Таймкоды", desc: "Сохраняет точные временные метки." },
      { title: "Двуязычные", desc: "Оригинал и перевод вместе." },
      { title: "Приватность", desc: "Локальная обработка в браузере." }
    ],
    formatsList: [
      { name: "SRT", desc: "Самый популярный." },
      { name: "ASS", desc: "Расширенный стиль." },
      { name: "VTT", desc: "Веб-стандарт." },
      { name: "LRC", desc: "Текст песен." }
    ],
    apisList: [
      { name: "Google", desc: "Бесплатно.", tag: "Бесплатно" },
      { name: "DeepL Pro", desc: "Лучшая точность.", tag: "Нужен ключ" },
      { name: "OpenAI", desc: "ИИ перевод.", tag: "Нужен ключ" }
    ],
    faqList: [
      { q: "Это бесплатно?", a: "Да, инструмент бесплатен." },
      { q: "Мои данные в безопасности?", a: "Да, все обрабатывается локально." }
    ],
    cta: { title: "Готовы?", btn: "Начать перевод" }
  },

  // 12. Vietnamese (vi)
  vi: {
    title: "Hướng dẫn sử dụng",
    subtitle: "Hướng dẫn đầy đủ để sử dụng Trình dịch phụ đề hiệu quả.",
    navTitle: "Điều hướng nhanh",
    quickStart: "Bắt đầu nhanh",
    features: "Tính năng",
    formats: "Định dạng",
    apis: "APIs",
    faq: "Hỏi đáp",
    steps: [
      { title: "Tải lên phụ đề", desc: "Kéo & thả tệp .srt, .ass, .vtt." },
      { title: "Chọn ngôn ngữ", desc: "Chọn ngôn ngữ nguồn và đích." },
      { title: "Cấu hình API", desc: "Chọn Google Miễn phí hoặc DeepL/OpenAI." },
      { title: "Dịch & Xuất", desc: "Tải xuống tệp phụ đề mới của bạn." }
    ],
    featuresList: [
      { title: "Xử lý hàng loạt", desc: "Dịch nhiều tệp cùng một lúc." },
      { title: "Giữ nguyên thời gian", desc: "Giữ chính xác dấu thời gian." },
      { title: "Phụ đề song ngữ", desc: "Hiển thị văn bản gốc và bản dịch." },
      { title: "Quyền riêng tư", desc: "Tệp được xử lý cục bộ trên trình duyệt." }
    ],
    formatsList: [
      { name: "SRT", desc: "Phổ biến nhất." },
      { name: "ASS", desc: "Kiểu dáng nâng cao." },
      { name: "VTT", desc: "Chuẩn Web." },
      { name: "LRC", desc: "Lời bài hát." }
    ],
    apisList: [
      { name: "Google", desc: "Hoàn toàn miễn phí.", tag: "Miễn phí" },
      { name: "DeepL Pro", desc: "Độ chính xác tốt nhất.", tag: "Cần Key" },
      { name: "OpenAI", desc: "Dịch thuật AI.", tag: "Cần Key" }
    ],
    faqList: [
      { q: "Có miễn phí không?", a: "Có! Công cụ này miễn phí." },
      { q: "Dữ liệu có an toàn không?", a: "Có, mọi xử lý đều diễn ra trên trình duyệt." }
    ],
    cta: { title: "Sẵn sàng?", btn: "Bắt đầu dịch" }
  },

  // 13. Thai (th)
  th: {
    title: "คู่มือผู้ใช้",
    subtitle: "คู่มือฉบับสมบูรณ์สำหรับการใช้เครื่องมือแปลคำบรรยาย",
    navTitle: "นำทางด่วน",
    quickStart: "เริ่มต้นด่วน",
    features: "คุณสมบัติ",
    formats: "รูปแบบ",
    apis: "APIs",
    faq: "คำถามที่พบบ่อย",
    steps: [
      { title: "อัปโหลดคำบรรยาย", desc: "ลากและวางไฟล์ .srt, .ass, .vtt" },
      { title: "เลือกภาษา", desc: "เลือกภาษาต้นทางและปลายทาง" },
      { title: "ตั้งค่า API", desc: "เลือก Google ฟรี หรือ DeepL/OpenAI" },
      { title: "แปลและส่งออก", desc: "ดาวน์โหลดไฟล์คำบรรยายใหม่ของคุณ" }
    ],
    featuresList: [
      { title: "ประมวลผลเป็นชุด", desc: "แปลหลายไฟล์พร้อมกัน" },
      { title: "รักษาช่วงเวลา", desc: "รักษาเวลาที่แม่นยำ" },
      { title: "คำบรรยายสองภาษา", desc: "แสดงข้อความต้นฉบับและคำแปล" },
      { title: "ความเป็นส่วนตัว", desc: "ไฟล์ถูกประมวลผลในเบราว์เซอร์ของคุณ" }
    ],
    formatsList: [
      { name: "SRT", desc: "รูปแบบทั่วไปที่สุด" },
      { name: "ASS", desc: "รูปแบบขั้นสูง" },
      { name: "VTT", desc: "มาตรฐานเว็บ" },
      { name: "LRC", desc: "เนื้อเพลง" }
    ],
    apisList: [
      { name: "Google", desc: "ฟรีโดยสิ้นเชิง", tag: "ฟรี" },
      { name: "DeepL Pro", desc: "ความแม่นยำสูงสุด", tag: "ต้องใช้คีย์" },
      { name: "OpenAI", desc: "การแปลด้วย AI", tag: "ต้องใช้คีย์" }
    ],
    faqList: [
      { q: "ฟรีหรือไม่?", a: "ใช่! เครื่องมือนี้ฟรี" },
      { q: "ข้อมูลปลอดภัยไหม?", a: "ใช่ การประมวลผลทั้งหมดเกิดขึ้นในเบราว์เซอร์" }
    ],
    cta: { title: "พร้อมไหม?", btn: "เริ่มแปล" }
  },

  // 14. Turkish (tr)
  tr: {
    title: "Kullanıcı Rehberi",
    subtitle: "Altyazı Çeviriciyi verimli kullanmak için tam rehber.",
    navTitle: "Hızlı Gezinti",
    quickStart: "Hızlı Başlangıç",
    features: "Özellikler",
    formats: "Formatlar",
    apis: "API'ler",
    faq: "SSS",
    steps: [
      { title: "Altyazı Yükle", desc: ".srt, .ass, .vtt dosyalarını sürükleyin." },
      { title: "Dil Seçin", desc: "Kaynak ve hedef dilleri seçin." },
      { title: "API Yapılandır", desc: "Ücretsiz Google veya DeepL/OpenAI." },
      { title: "Çevir ve İndir", desc: "Yeni altyazı dosyanızı indirin." }
    ],
    featuresList: [
      { title: "Toplu İşleme", desc: "Birden fazla dosyayı aynı anda çevirin." },
      { title: "Zaman Koruma", desc: "Zaman damgalarını tam korur." },
      { title: "İki Dilli Altyazı", desc: "Orijinal ve çeviriyi birlikte gösterin." },
      { title: "Gizlilik", desc: "Dosyalar tarayıcıda işlenir." }
    ],
    formatsList: [
      { name: "SRT", desc: "En yaygın format." },
      { name: "ASS", desc: "Gelişmiş stil." },
      { name: "VTT", desc: "Web standardı." },
      { name: "LRC", desc: "Şarkı sözleri." }
    ],
    apisList: [
      { name: "Google", desc: "Tamamen ücretsiz.", tag: "Ücretsiz" },
      { name: "DeepL Pro", desc: "En iyi doğruluk.", tag: "Anahtar Gerekli" },
      { name: "OpenAI", desc: "YZ çevirisi.", tag: "Anahtar Gerekli" }
    ],
    faqList: [
      { q: "Ücretsiz mi?", a: "Evet! Araç ücretsizdir." },
      { q: "Verilerim güvende mi?", a: "Evet, her şey tarayıcınızda işlenir." }
    ],
    cta: { title: "Hazır mısın?", btn: "Çeviriye Başla" }
  },

  // 15. Traditional Chinese (zh-hant)
  "zh-hant": {
    title: "使用者指南",
    subtitle: "字幕翻譯器完整使用指南，助您高效翻譯。",
    navTitle: "快速導航",
    quickStart: "快速開始",
    features: "核心功能",
    formats: "支援格式",
    apis: "翻譯介面",
    faq: "常見問題",
    steps: [
      { title: "上傳字幕", desc: "拖放 .srt, .ass, .vtt 或 .lrc 檔案。" },
      { title: "選擇語言", desc: "選擇來源語言和目標語言。" },
      { title: "配置 API", desc: "選擇免費 Google 翻譯或進階服務 (DeepL/OpenAI)。" },
      { title: "翻譯並匯出", desc: "處理並下載您的新字幕檔案。" }
    ],
    featuresList: [
      { title: "批次處理", desc: "一次自動翻譯多個檔案。" },
      { title: "時間軸保留", desc: "精準保持原始時間戳和格式。" },
      { title: "雙語字幕", desc: "同時顯示原文和譯文。" },
      { title: "隱私優先", desc: "本地處理檔案，API 金鑰存儲在瀏覽器中。" }
    ],
    formatsList: [
      { name: "SRT", desc: "最通用的格式。" },
      { name: "ASS", desc: "支援進階樣式。" },
      { name: "VTT", desc: "網頁標準。" },
      { name: "LRC", desc: "歌詞格式。" }
    ],
    apisList: [
      { name: "Google", desc: "完全免費。", tag: "免費" },
      { name: "DeepL Pro", desc: "準確度最高。", tag: "需要金鑰" },
      { name: "OpenAI", desc: "AI 翻譯。", tag: "需要金鑰" }
    ],
    faqList: [
      { q: "是免費的嗎？", a: "是的！工具本身免費。" },
      { q: "我的資料安全嗎？", a: "安全，所有處理均在您的瀏覽器本地進行。" }
    ],
    cta: { title: "準備好了嗎？", btn: "開始翻譯" }
  },

  // 16. Bengali (bn)
  bn: {
    title: "ব্যবহার자 নির্দেশিকা",
    subtitle: "সাবটাইটেল অনুবাদক ব্যবহারের সম্পূর্ণ নির্দেশিকা।",
    navTitle: "দ্রুত নেভিগেশন",
    quickStart: "দ্রুত শুরু",
    features: "বৈশিষ্ট্য",
    formats: "ফরম্যাট",
    apis: "APIs",
    faq: "প্রশ্নাবলী",
    steps: [
      { title: "সাবটাইটেল আপলোড", desc: ".srt, .ass, .vtt ফাইল ড্র্যাগ ও ড্রপ করুন।" },
      { title: "ভাষা নির্বাচন", desc: "উৎস এবং লক্ষ্য ভাষা নির্বাচন করুন।" },
      { title: "API কনফিগার", desc: "ফ্রি গুগল বা DeepL/OpenAI নির্বাচন করুন।" },
      { title: "অনুবাদ ও এক্সপোর্ট", desc: "আপনার নতুন ফাইল ডাউনলোড করুন।" }
    ],
    featuresList: [
      { title: "ব্যাচ প্রসেসিং", desc: "একসাথে একাধিক ফাইল অনুবাদ করুন।" },
      { title: "সময় সংরক্ষণ", desc: "সঠিক সময় বজায় রাখে।" },
      { title: "দ্বিভাষিক সাবটাইটেল", desc: "আসল এবং অনুবাদিত লেখা একসাথে।" },
      { title: "গোপনীয়তা", desc: "ফাইলগুলি আপনার ব্রাউজারে প্রসেস হয়।" }
    ],
    formatsList: [
      { name: "SRT", desc: "সবচেয়ে সাধারণ।" },
      { name: "ASS", desc: "উন্নত স্টাইলিং।" },
      { name: "VTT", desc: "ওয়েব স্ট্যান্ডার্ড।" },
      { name: "LRC", desc: "গানের লিরিক্স।" }
    ],
    apisList: [
      { name: "Google", desc: "সম্পূর্ণ বিনামূল্যে।", tag: "ফ্রি" },
      { name: "DeepL Pro", desc: "সেরা নির্ভুলতা।", tag: "কী প্রয়োজন" },
      { name: "OpenAI", desc: "AI অনুবাদ।", tag: "কী প্রয়োজন" }
    ],
    faqList: [
      { q: "এটা কি ফ্রি?", a: "হ্যাঁ! টুলটি ফ্রি।" },
      { q: "আমার তথ্য কি নিরাপদ?", a: "হ্যাঁ, সবকিছু আপনার ব্রাউজারে থাকে।" }
    ],
    cta: { title: "প্রস্তুত?", btn: "অনুবাদ শুরু করুন" }
  },

  // 17. Indonesian (id)
  id: {
    title: "Panduan Pengguna",
    subtitle: "Panduan lengkap menggunakan Penerjemah Subtitle.",
    navTitle: "Navigasi Cepat",
    quickStart: "Mulai Cepat",
    features: "Fitur",
    formats: "Format",
    apis: "API",
    faq: "FAQ",
    steps: [
      { title: "Unggah Subtitle", desc: "Tarik & lepas file .srt, .ass, .vtt." },
      { title: "Pilih Bahasa", desc: "Pilih bahasa sumber dan tujuan." },
      { title: "Konfigurasi API", desc: "Pilih Google Gratis atau DeepL/OpenAI." },
      { title: "Terjemahkan", desc: "Unduh file subtitle baru Anda." }
    ],
    featuresList: [
      { title: "Pemrosesan Batch", desc: "Terjemahkan banyak file sekaligus." },
      { title: "Preservasi Waktu", desc: "Menjaga stempel waktu yang tepat." },
      { title: "Subtitle Dwi-bahasa", desc: "Tampilkan teks asli dan terjemahan." },
      { title: "Privasi", desc: "File diproses secara lokal di browser." }
    ],
    formatsList: [
      { name: "SRT", desc: "Paling umum." },
      { name: "ASS", desc: "Gaya lanjutan." },
      { name: "VTT", desc: "Standar web." },
      { name: "LRC", desc: "Lirik lagu." }
    ],
    apisList: [
      { name: "Google", desc: "Gratis total.", tag: "Gratis" },
      { name: "DeepL Pro", desc: "Akurasi terbaik.", tag: "Perlu Kunci" },
      { name: "OpenAI", desc: "Terjemahan AI.", tag: "Perlu Kunci" }
    ],
    faqList: [
      { q: "Apakah ini gratis?", a: "Ya! Alat ini gratis." },
      { q: "Apakah data saya aman?", a: "Ya, semua diproses di browser Anda." }
    ],
    cta: { title: "Siap?", btn: "Mulai Menerjemahkan" }
  },

  // 18. Italian (it)
  it: {
    title: "Guida Utente",
    subtitle: "Guida completa all'uso del Traduttore di Sottotitoli.",
    navTitle: "Navigazione Rapida",
    quickStart: "Avvio Rapido",
    features: "Funzionalità",
    formats: "Formati",
    apis: "API",
    faq: "FAQ",
    steps: [
      { title: "Carica Sottotitoli", desc: "Trascina file .srt, .ass, .vtt." },
      { title: "Seleziona Lingue", desc: "Scegli lingua di origine e destinazione." },
      { title: "Configura API", desc: "Usa Google Gratis o DeepL/OpenAI." },
      { title: "Traduci ed Esporta", desc: "Scarica i tuoi nuovi sottotitoli." }
    ],
    featuresList: [
      { title: "Elaborazione Batch", desc: "Traduci più file contemporaneamente." },
      { title: "Preservazione Tempo", desc: "Mantiene i timestamp esatti." },
      { title: "Sottotitoli Bilingue", desc: "Mostra testo originale e tradotto." },
      { title: "Privacy", desc: "File elaborati localmente nel browser." }
    ],
    formatsList: [
      { name: "SRT", desc: "Più comune." },
      { name: "ASS", desc: "Stile avanzato." },
      { name: "VTT", desc: "Standard web." },
      { name: "LRC", desc: "Testi musicali." }
    ],
    apisList: [
      { name: "Google", desc: "Completamente gratis.", tag: "Gratis" },
      { name: "DeepL Pro", desc: "Migliore precisione.", tag: "Chiave Richiesta" },
      { name: "OpenAI", desc: "Traduzione AI.", tag: "Chiave Richiesta" }
    ],
    faqList: [
      { q: "È gratuito?", a: "Sì! Lo strumento è gratuito." },
      { q: "I miei dati sono sicuri?", a: "Sì, tutto viene elaborato nel browser." }
    ],
    cta: { title: "Pronto?", btn: "Inizia a Tradurre" }
  }
};

export default function UserGuideClient() {
  const router = useRouter();
  const locale = useLocale(); 

  // Select content based on locale, fallback to English if missing
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -20; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="user-guide-container" style={{ width: "100%", maxWidth: 1000, margin: "0 auto", padding: "20px 16px" }}>
      
      {/* 1. Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Title level={1} style={{ marginBottom: 12, fontSize: "2rem" }}>
          <QuestionCircleOutlined style={{ marginRight: 12, color: "#1890ff" }} />
          {t.title}
        </Title>
        <Paragraph style={{ fontSize: 16, color: "gray", maxWidth: 600, margin: "0 auto" }}>
          {t.subtitle}
        </Paragraph>
      </div>

      {/* 2. Navigation */}
      <div style={{ marginBottom: 40 }}>
        <Alert
          message={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontWeight: 600 }}><BulbOutlined /> {t.navTitle}:</span>
              <Space wrap size={[8, 8]}>
                <Button size="small" onClick={() => scrollToSection("quick-start")}>{t.quickStart}</Button>
                <Button size="small" onClick={() => scrollToSection("features")}>{t.features}</Button>
                <Button size="small" onClick={() => scrollToSection("formats")}>{t.formats}</Button>
                <Button size="small" onClick={() => scrollToSection("apis")}>{t.apis}</Button>
                <Button size="small" onClick={() => scrollToSection("faq")}>{t.faq}</Button>
              </Space>
            </div>
          }
          type="info"
          style={{ border: "1px solid #e6f7ff" }}
        />
      </div>

      <Space direction="vertical" size={48} style={{ width: "100%" }}>
        
        {/* Quick Start */}
        <div id="quick-start">
          <Card title={<Title level={3} style={{ margin: 0, fontSize: "1.5rem" }}><RocketOutlined /> {t.quickStart}</Title>}>
            <Steps
              direction="vertical"
              size="small"
              items={t.steps.map((step: any, index: number) => ({
                title: <span style={{ fontWeight: 600 }}>{step.title}</span>,
                description: step.desc,
                status: 'process',
                icon: [
                   <FileTextOutlined key="1" />, 
                   <GlobalOutlined key="2" />, 
                   <ApiOutlined key="3" />, 
                   <PlayCircleOutlined key="4" />
                ][index]
              }))}
            />
            <Divider />
            <Button type="primary" block size="large" icon={<PlayCircleOutlined />} onClick={() => router.push(`/${locale}`)}>
              {t.cta.btn}
            </Button>
          </Card>
        </div>

        {/* Features */}
        <div id="features">
          <Card title={<Title level={3} style={{ margin: 0, fontSize: "1.5rem" }}><ThunderboltOutlined /> {t.features}</Title>}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {t.featuresList.map((item: any, index: number) => (
                <Card key={index} type="inner" title={item.title} size="small">
                  <Paragraph style={{ marginBottom: 0 }}>{item.desc}</Paragraph>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Formats */}
        <div id="formats">
          <Card title={<Title level={3} style={{ margin: 0, fontSize: "1.5rem" }}><FileTextOutlined /> {t.formats}</Title>}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {t.formatsList.map((format: any, index: number) => (
                <Card key={index} type="inner" size="small">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text strong>{format.name}</Text>
                    <Tag color="cyan">{format.name === 'SRT' ? '.srt' : format.name === 'ASS' ? '.ass' : format.name === 'VTT' ? '.vtt' : '.lrc'}</Tag>
                  </div>
                  <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 0 }}>{format.desc}</Paragraph>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* APIs */}
        <div id="apis">
          <Card title={<Title level={3} style={{ margin: 0, fontSize: "1.5rem" }}><ApiOutlined /> {t.apis}</Title>}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {t.apisList.map((api: any, index: number) => (
                <Card key={index} type="inner" size="small">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Text strong>{api.name}</Text>
                    <Tag color={api.tag.includes("Free") || api.tag.includes("免费") || api.tag.includes("Gratis") || api.tag.includes("무료") || api.tag.includes("مجاني") || api.tag.includes("Ücretsiz") || api.tag.includes("ฟรี") || api.tag.includes("Бесплатно") ? "success" : "warning"}>{api.tag}</Tag>
                  </div>
                  <Paragraph style={{ fontSize: 13 }}>{api.desc}</Paragraph>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* FAQ */}
        <div id="faq">
          <Card title={<Title level={3} style={{ margin: 0, fontSize: "1.5rem" }}><QuestionCircleOutlined /> {t.faq}</Title>}>
            <Collapse 
              ghost 
              items={t.faqList.map((f: any, i: number) => ({
                key: i,
                label: f.q,
                children: <Paragraph>{f.a}</Paragraph>
              }))} 
            />
          </Card>
        </div>

      </Space>

      {/* Footer */}
      <div style={{ marginTop: 48, textAlign: "center", padding: "32px 16px", background: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)", borderRadius: 8, color: "white" }}>
        <Title level={3} style={{ color: "white", marginBottom: 8 }}>{t.cta.title}</Title>
        <Button size="large" ghost icon={<RocketOutlined />} onClick={() => router.push(`/${locale}`)}>
          {t.cta.btn}
        </Button>
      </div>
    </div>
  );
}
