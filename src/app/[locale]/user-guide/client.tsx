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
  CheckCircleOutlined,
  WarningOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const { Title, Paragraph, Text, Link } = Typography;

// ==========================================
// 1. HARDCODED TRANSLATIONS (All in one place)
// ==========================================
const TRANSLATIONS: any = {
  // --- ENGLISH (Default) ---
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
    formats: [
      { name: "SRT", desc: "Most common format. Compatible with everything." },
      { name: "ASS", desc: "Advanced styling (fonts, colors, positioning)." },
      { name: "VTT", desc: "Web standard for HTML5 players." },
      { name: "LRC", desc: "Lyrics format for music." }
    ],
    apis: [
      { name: "Google (Free)", desc: "Completely free, no key required.", tag: "Free" },
      { name: "DeepL Pro", desc: "Best accuracy, natural nuance.", tag: "Key Required" },
      { name: "OpenAI (GPT)", desc: "Context-aware AI translation.", tag: "Key Required" }
    ],
    faq: [
      { q: "Is it free?", a: "Yes! The tool is free. Premium APIs (DeepL) need your own key." },
      { q: "Is my data safe?", a: "Yes, all processing happens in your browser." },
      { q: "Can I do batch files?", a: "Yes, upload multiple files to process them sequentially." }
    ],
    cta: { title: "Ready?", btn: "Start Translating" }
  },

  // --- CHINESE (中文) ---
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
    formats: [
      { name: "SRT", desc: "最通用的格式，兼容性最好。" },
      { name: "ASS", desc: "支持高级样式（字体、颜色、位置）。" },
      { name: "VTT", desc: "HTML5 播放器的网页标准。" },
      { name: "LRC", desc: "用于音乐的歌词格式。" }
    ],
    apis: [
      { name: "Google (免费)", desc: "完全免费，无需密钥。", tag: "免费" },
      { name: "DeepL Pro", desc: "准确度最高，语气自然。", tag: "需要密钥" },
      { name: "OpenAI (GPT)", desc: "支持上下文理解的 AI 翻译。", tag: "需要密钥" }
    ],
    faq: [
      { q: "是免费的吗？", a: "是的！工具本身免费。高级 API (DeepL) 需要您自己的密钥。" },
      { q: "我的数据安全吗？", a: "安全，所有处理均在您的浏览器本地进行。" },
      { q: "支持批量吗？", a: "支持，上传多个文件即可按顺序处理。" }
    ],
    cta: { title: "准备好了吗？", btn: "开始翻译" }
  },

  // --- SPANISH (Español) ---
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
      { title: "Seleccionar Idiomas", desc: "Elige idiomas de origen y destino (60+)." },
      { title: "Configurar API", desc: "Usa Google Gratis o Premium (DeepL/OpenAI)." },
      { title: "Traducir y Exportar", desc: "Procesa y descarga tus nuevos subtítulos." }
    ],
    featuresList: [
      { title: "Procesamiento por Lotes", desc: "Traduce múltiples archivos a la vez." },
      { title: "Preservación de Tiempos", desc: "Mantiene las marcas de tiempo exactas." },
      { title: "Subtítulos Bilingües", desc: "Muestra texto original y traducido." },
      { title: "Privacidad", desc: "Archivos procesados localmente." }
    ],
    formats: [
      { name: "SRT", desc: "Formato más común. Compatible con todo." },
      { name: "ASS", desc: "Estilos avanzados (fuentes, colores)." },
      { name: "VTT", desc: "Estándar web para reproductores HTML5." },
      { name: "LRC", desc: "Formato de letras para música." }
    ],
    apis: [
      { name: "Google (Gratis)", desc: "Completamente gratis, sin clave.", tag: "Gratis" },
      { name: "DeepL Pro", desc: "Mejor precisión y tono natural.", tag: "Requiere Clave" },
      { name: "OpenAI (GPT)", desc: "Traducción AI con contexto.", tag: "Requiere Clave" }
    ],
    faq: [
      { q: "¿Es gratis?", a: "¡Sí! La herramienta es gratis. Las APIs premium requieren tu propia clave." },
      { q: "¿Mis datos están seguros?", a: "Sí, todo el procesamiento ocurre en tu navegador." },
      { q: "¿Puedo procesar lotes?", a: "Sí, sube múltiples archivos para procesar." }
    ],
    cta: { title: "¿Listo?", btn: "Empezar a Traducir" }
  }
};

export default function UserGuideClient() {
  const router = useRouter();
  const locale = useLocale(); // Get current URL language (e.g., 'en', 'zh', 'es')

  // Select content based on locale, fallback to English if missing
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
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

      {/* 2. Navigation (Responsive, Non-Sticky on Mobile) */}
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
              {t.formats.map((format: any, index: number) => (
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
              {t.apis.map((api: any, index: number) => (
                <Card key={index} type="inner" size="small">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Text strong>{api.name}</Text>
                    <Tag color={api.tag === "Free" || api.tag === "免费" || api.tag === "Gratis" ? "success" : "warning"}>{api.tag}</Tag>
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
              items={t.faq.map((f: any, i: number) => ({
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
