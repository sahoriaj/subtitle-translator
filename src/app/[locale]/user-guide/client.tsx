"use client";

import React from "react"; // Removed useState
import { Typography, Card, Space, Divider, Collapse, Alert, Steps, Button, Tag } from "antd";
import {
  FileTextOutlined,
  ApiOutlined,
  SafetyOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text, Link } = Typography;

export default function UserGuideClient() {
  const t = useTranslations("userGuide");
  const locale = useLocale();
  const router = useRouter();

  // Helper function to smooth scroll to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // --- Data Definitions (Same as your original code) ---
  const quickStartSteps = [
    { title: t("quickStart.step1.title"), description: t("quickStart.step1.description"), icon: <FileTextOutlined /> },
    { title: t("quickStart.step2.title"), description: t("quickStart.step2.description"), icon: <GlobalOutlined /> },
    { title: t("quickStart.step3.title"), description: t("quickStart.step3.description"), icon: <ApiOutlined /> },
    { title: t("quickStart.step4.title"), description: t("quickStart.step4.description"), icon: <PlayCircleOutlined /> },
  ];

  const supportedFormats = [
    {
      name: "SRT (SubRip)", extension: ".srt", description: t("formats.srt.description"),
      features: [t("formats.common.feature1"), t("formats.common.feature2"), t("formats.common.feature3")],
    },
    // ... (Keep your other formats here)
  ];

  // ... (Keep translationAPIs and faqItems definitions here) ...
  // [Assuming you kept the arrays from your previous code]

  return (
    <div className="user-guide-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
      
      {/* 1. Header */}
      <div className="guide-header" style={{ textAlign: "center", marginBottom: 48 }}>
        <Title level={1} style={{ marginBottom: 16 }}>
          <QuestionCircleOutlined style={{ marginRight: 12, color: "#1890ff" }} />
          {t("title")}
        </Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 800, margin: "0 auto" }} type="secondary">
          {t("subtitle")}
        </Paragraph>
      </div>

      {/* 2. Sticky Quick Navigation */}
      {/* We use sticky positioning so this bar stays visible as the user scrolls */}
      <div style={{ position: "sticky", top: 20, zIndex: 100, marginBottom: 32 }}>
        <Alert
          message={t("navigation.title")}
          description={
            <Space wrap size="large">
              <Button type="link" onClick={() => scrollToSection("quick-start")}>
                <RocketOutlined /> {t("navigation.quickStart")}
              </Button>
              <Button type="link" onClick={() => scrollToSection("features")}>
                <ThunderboltOutlined /> {t("navigation.features")}
              </Button>
              <Button type="link" onClick={() => scrollToSection("formats")}>
                <FileTextOutlined /> {t("navigation.formats")}
              </Button>
              <Button type="link" onClick={() => scrollToSection("apis")}>
                <ApiOutlined /> {t("navigation.apis")}
              </Button>
              <Button type="link" onClick={() => scrollToSection("faq")}>
                <QuestionCircleOutlined /> {t("navigation.faq")}
              </Button>
            </Space>
          }
          type="info"
          showIcon
          icon={<BulbOutlined />}
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        />
      </div>

      {/* 3. Main Content Stack (No more Tabs) */}
      <Space direction="vertical" size={64} style={{ width: "100%" }}>
        
        {/* SECTION: Quick Start */}
        <div id="quick-start">
          <Card title={<Title level={2}><RocketOutlined /> {t("quickStart.title")}</Title>}>
            <Paragraph>{t("quickStart.description")}</Paragraph>
            <Steps
              direction="vertical"
              items={quickStartSteps.map((step) => ({
                title: step.title,
                description: step.description,
                icon: step.icon,
              }))}
              style={{ marginTop: 32 }}
            />
            <Divider />
            <div style={{ textAlign: "center" }}>
              <Button type="primary" size="large" icon={<PlayCircleOutlined />} onClick={() => router.push(`/${locale}`)}>
                {t("quickStart.tryNow")}
              </Button>
            </div>
          </Card>
        </div>

        {/* SECTION: Features */}
        <div id="features">
          <Card title={<Title level={2}><ThunderboltOutlined /> {t("features.title")}</Title>}>
            <Paragraph>{t("features.description")}</Paragraph>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {/* Reuse your existing feature cards logic here */}
              <Card type="inner" title={t("features.batch.title")}>
                  <Paragraph>{t("features.batch.description")}</Paragraph>
              </Card>
              {/* ... Add other feature cards ... */}
            </div>
          </Card>
        </div>

        {/* SECTION: Formats */}
        <div id="formats">
          <Card title={<Title level={2}><FileTextOutlined /> {t("formats.title")}</Title>}>
            <Paragraph>{t("formats.description")}</Paragraph>
            <div style={{ marginTop: 32 }}>
              {supportedFormats.map((format, index) => (
                <Card key={index} type="inner" style={{ marginBottom: 16 }}>
                  <Title level={4}>{format.name} <Tag color="cyan">{format.extension}</Tag></Title>
                  <Paragraph>{format.description}</Paragraph>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* SECTION: APIs */}
        <div id="apis">
          <Card title={<Title level={2}><ApiOutlined /> {t("apis.title")}</Title>}>
             {/* ... Reuse your API mapping logic here ... */}
             <Paragraph>{t("apis.description")}</Paragraph>
          </Card>
        </div>

        {/* SECTION: FAQ */}
        <div id="faq">
          <Card title={<Title level={2}><QuestionCircleOutlined /> {t("faq.title")}</Title>}>
            <Collapse items={faqItems} defaultActiveKey={["1"]} />
          </Card>
        </div>

      </Space>

      {/* 4. Bottom CTA */}
      <Card style={{ marginTop: 64, textAlign: "center", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
        <Title level={2} style={{ color: "white" }}>{t("cta.title")}</Title>
        <Paragraph style={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }}>{t("cta.description")}</Paragraph>
        <Button ghost size="large" icon={<RocketOutlined />} onClick={() => router.push(`/${locale}`)} style={{ marginTop: 16 }}>
          {t("cta.button")}
        </Button>
      </Card>

    </div>
  );
}
