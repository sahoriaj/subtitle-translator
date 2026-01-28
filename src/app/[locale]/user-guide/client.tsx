"use client";

import React, { useState } from "react";
import { Typography, Card, Space, Divider, Tabs, Collapse, Alert, Steps, Button, Tag } from "antd";
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
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("1");

  // Quick Start Steps
  const quickStartSteps = [
    {
      title: t("quickStart.step1.title"),
      description: t("quickStart.step1.description"),
      icon: <FileTextOutlined />,
    },
    {
      title: t("quickStart.step2.title"),
      description: t("quickStart.step2.description"),
      icon: <GlobalOutlined />,
    },
    {
      title: t("quickStart.step3.title"),
      description: t("quickStart.step3.description"),
      icon: <ApiOutlined />,
    },
    {
      title: t("quickStart.step4.title"),
      description: t("quickStart.step4.description"),
      icon: <PlayCircleOutlined />,
    },
  ];

  // Supported Formats
  const supportedFormats = [
    {
      name: "SRT (SubRip)",
      extension: ".srt",
      description: t("formats.srt.description"),
      features: [t("formats.common.feature1"), t("formats.common.feature2"), t("formats.common.feature3")],
    },
    {
      name: "ASS (Advanced SubStation Alpha)",
      extension: ".ass",
      description: t("formats.ass.description"),
      features: [t("formats.ass.feature1"), t("formats.ass.feature2"), t("formats.ass.feature3")],
    },
    {
      name: "VTT (WebVTT)",
      extension: ".vtt",
      description: t("formats.vtt.description"),
      features: [t("formats.vtt.feature1"), t("formats.vtt.feature2"), t("formats.vtt.feature3")],
    },
    {
      name: "LRC (Lyrics)",
      extension: ".lrc",
      description: t("formats.lrc.description"),
      features: [t("formats.lrc.feature1"), t("formats.lrc.feature2")],
    },
  ];

  // Translation APIs
  const translationAPIs = [
    {
      name: "Google Translate (GTX Free)",
      icon: "🆓",
      description: t("apis.gtx.description"),
      pros: [t("apis.gtx.pro1"), t("apis.gtx.pro2")],
      cons: [t("apis.gtx.con1"), t("apis.gtx.con2")],
      requiresKey: false,
    },
    {
      name: "DeepL",
      icon: "🔷",
      description: t("apis.deepl.description"),
      pros: [t("apis.deepl.pro1"), t("apis.deepl.pro2"), t("apis.deepl.pro3")],
      cons: [t("apis.deepl.con1")],
      requiresKey: true,
      link: "https://www.deepl.com/pro-api",
    },
    {
      name: "OpenAI",
      icon: "🤖",
      description: t("apis.openai.description"),
      pros: [t("apis.openai.pro1"), t("apis.openai.pro2"), t("apis.openai.pro3")],
      cons: [t("apis.openai.con1"), t("apis.openai.con2")],
      requiresKey: true,
      link: "https://platform.openai.com/api-keys",
    },
    {
      name: "Azure Translate",
      icon: "☁️",
      description: t("apis.azure.description"),
      pros: [t("apis.azure.pro1"), t("apis.azure.pro2")],
      cons: [t("apis.azure.con1")],
      requiresKey: true,
      link: "https://azure.microsoft.com/en-us/services/cognitive-services/translator/",
    },
  ];

  // FAQ Items
  const faqItems = [
    {
      key: "1",
      label: t("faq.q1.question"),
      children: <Paragraph>{t("faq.q1.answer")}</Paragraph>,
    },
    {
      key: "2",
      label: t("faq.q2.question"),
      children: <Paragraph>{t("faq.q2.answer")}</Paragraph>,
    },
    {
      key: "3",
      label: t("faq.q3.question"),
      children: <Paragraph>{t("faq.q3.answer")}</Paragraph>,
    },
    {
      key: "4",
      label: t("faq.q4.question"),
      children: <Paragraph>{t("faq.q4.answer")}</Paragraph>,
    },
    {
      key: "5",
      label: t("faq.q5.question"),
      children: <Paragraph>{t("faq.q5.answer")}</Paragraph>,
    },
    {
      key: "6",
      label: t("faq.q6.question"),
      children: <Paragraph>{t("faq.q6.answer")}</Paragraph>,
    },
  ];

  return (
    <div className="user-guide-container">
      {/* Header */}
      <div className="guide-header" style={{ textAlign: "center", marginBottom: 48 }}>
        <Title level={1} style={{ marginBottom: 16 }}>
          <QuestionCircleOutlined style={{ marginRight: 12, color: "#1890ff" }} />
          {t("title")}
        </Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 800, margin: "0 auto" }} type="secondary">
          {t("subtitle")}
        </Paragraph>
      </div>

      {/* Quick Navigation */}
      <Alert
        message={t("navigation.title")}
        description={
          <Space wrap>
            <Button type="link" onClick={() => setActiveTab("1")}>
              {t("navigation.quickStart")}
            </Button>
            <Button type="link" onClick={() => setActiveTab("2")}>
              {t("navigation.features")}
            </Button>
            <Button type="link" onClick={() => setActiveTab("3")}>
              {t("navigation.formats")}
            </Button>
            <Button type="link" onClick={() => setActiveTab("4")}>
              {t("navigation.apis")}
            </Button>
            <Button type="link" onClick={() => setActiveTab("5")}>
              {t("navigation.faq")}
            </Button>
          </Space>
        }
        type="info"
        icon={<BulbOutlined />}
        style={{ marginBottom: 32 }}
        showIcon
      />

      {/* Main Content Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        size="large"
        items={[
          {
            key: "1",
            label: (
              <span>
                <RocketOutlined /> {t("tabs.quickStart")}
              </span>
            ),
            children: (
              <Card>
                <Title level={2}>
                  <RocketOutlined style={{ marginRight: 8 }} />
                  {t("quickStart.title")}
                </Title>
                <Paragraph>{t("quickStart.description")}</Paragraph>

                <Steps
                  direction="vertical"
                  current={-1}
                  items={quickStartSteps.map((step) => ({
                    title: step.title,
                    description: step.description,
                    icon: step.icon,
                  }))}
                  style={{ marginTop: 32 }}
                />

                <Divider />

                <Alert
                  message={t("quickStart.tip.title")}
                  description={t("quickStart.tip.description")}
                  type="success"
                  showIcon
                  icon={<BulbOutlined />}
                />

                <div style={{ marginTop: 24, textAlign: "center" }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    onClick={() => router.push(`/${locale}`)}>
                    {t("quickStart.tryNow")}
                  </Button>
                </div>
              </Card>
            ),
          },
          {
            key: "2",
            label: (
              <span>
                <ThunderboltOutlined /> {t("tabs.features")}
              </span>
            ),
            children: (
              <Card>
                <Title level={2}>
                  <ThunderboltOutlined style={{ marginRight: 8 }} />
                  {t("features.title")}
                </Title>
                <Paragraph>{t("features.description")}</Paragraph>

                <div style={{ marginTop: 32 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                    {/* Feature 1: Batch Processing */}
                    <Card type="inner" title={t("features.batch.title")}>
                      <Paragraph>{t("features.batch.description")}</Paragraph>
                      <ul style={{ paddingLeft: 20 }}>
                        <li>{t("features.batch.point1")}</li>
                        <li>{t("features.batch.point2")}</li>
                        <li>{t("features.batch.point3")}</li>
                      </ul>
                    </Card>

                    {/* Feature 2: Timeline Preservation */}
                    <Card type="inner" title={t("features.timeline.title")}>
                      <Paragraph>{t("features.timeline.description")}</Paragraph>
                      <ul style={{ paddingLeft: 20 }}>
                        <li>{t("features.timeline.point1")}</li>
                        <li>{t("features.timeline.point2")}</li>
                        <li>{t("features.timeline.point3")}</li>
                      </ul>
                    </Card>

                    {/* Feature 3: Bilingual Subtitles */}
                    <Card type="inner" title={t("features.bilingual.title")}>
                      <Paragraph>{t("features.bilingual.description")}</Paragraph>
                      <ul style={{ paddingLeft: 20 }}>
                        <li>{t("features.bilingual.point1")}</li>
                        <li>{t("features.bilingual.point2")}</li>
                        <li>{t("features.bilingual.point3")}</li>
                      </ul>
                    </Card>

                    {/* Feature 4: Multiple Languages */}
                    <Card type="inner" title={t("features.languages.title")}>
                      <Paragraph>{t("features.languages.description")}</Paragraph>
                      <Space wrap style={{ marginTop: 8 }}>
                        <Tag color="blue">English</Tag>
                        <Tag color="blue">中文</Tag>
                        <Tag color="blue">日本語</Tag>
                        <Tag color="blue">한국어</Tag>
                        <Tag color="blue">Español</Tag>
                        <Tag color="blue">Français</Tag>
                        <Tag>+60 {t("features.languages.more")}</Tag>
                      </Space>
                    </Card>

                    {/* Feature 5: Privacy */}
                    <Card type="inner" title={t("features.privacy.title")}>
                      <Paragraph>{t("features.privacy.description")}</Paragraph>
                      <ul style={{ paddingLeft: 20 }}>
                        <li>{t("features.privacy.point1")}</li>
                        <li>{t("features.privacy.point2")}</li>
                        <li>{t("features.privacy.point3")}</li>
                      </ul>
                    </Card>

                    {/* Feature 6: Context-Aware */}
                    <Card type="inner" title={t("features.context.title")}>
                      <Paragraph>{t("features.context.description")}</Paragraph>
                      <ul style={{ paddingLeft: 20 }}>
                        <li>{t("features.context.point1")}</li>
                        <li>{t("features.context.point2")}</li>
                        <li>{t("features.context.point3")}</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </Card>
            ),
          },
          {
            key: "3",
            label: (
              <span>
                <FileTextOutlined /> {t("tabs.formats")}
              </span>
            ),
            children: (
              <Card>
                <Title level={2}>
                  <FileTextOutlined style={{ marginRight: 8 }} />
                  {t("formats.title")}
                </Title>
                <Paragraph>{t("formats.description")}</Paragraph>

                <div style={{ marginTop: 32 }}>
                  {supportedFormats.map((format, index) => (
                    <Card key={index} type="inner" style={{ marginBottom: 16 }}>
                      <Title level={4}>
                        {format.name} <Tag color="cyan">{format.extension}</Tag>
                      </Title>
                      <Paragraph>{format.description}</Paragraph>
                      <Title level={5}>{t("formats.featuresLabel")}</Title>
                      <ul style={{ paddingLeft: 20 }}>
                        {format.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>

                <Alert
                  message={t("formats.note.title")}
                  description={t("formats.note.description")}
                  type="info"
                  showIcon
                  style={{ marginTop: 24 }}
                />
              </Card>
            ),
          },
          {
            key: "4",
            label: (
              <span>
                <ApiOutlined /> {t("tabs.apis")}
              </span>
            ),
            children: (
              <Card>
                <Title level={2}>
                  <ApiOutlined style={{ marginRight: 8 }} />
                  {t("apis.title")}
                </Title>
                <Paragraph>{t("apis.description")}</Paragraph>

                <div style={{ marginTop: 32 }}>
                  {translationAPIs.map((api, index) => (
                    <Card key={index} type="inner" style={{ marginBottom: 16 }}>
                      <Title level={4}>
                        <span style={{ fontSize: 24, marginRight: 8 }}>{api.icon}</span>
                        {api.name}
                        {api.requiresKey ? (
                          <Tag color="warning" style={{ marginLeft: 8 }}>
                            {t("apis.requiresKey")}
                          </Tag>
                        ) : (
                          <Tag color="success" style={{ marginLeft: 8 }}>
                            {t("apis.free")}
                          </Tag>
                        )}
                      </Title>
                      <Paragraph>{api.description}</Paragraph>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                        <div>
                          <Text strong style={{ color: "#52c41a" }}>
                            ✓ {t("apis.pros")}
                          </Text>
                          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                            {api.pros.map((pro, idx) => (
                              <li key={idx}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <Text strong style={{ color: "#faad14" }}>
                            ⚠ {t("apis.cons")}
                          </Text>
                          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                            {api.cons.map((con, idx) => (
                              <li key={idx}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {api.link && (
                        <div style={{ marginTop: 16 }}>
                          <Link href={api.link} target="_blank">
                            {t("apis.getKey")} →
                          </Link>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>

                <Alert
                  message={t("apis.security.title")}
                  description={t("apis.security.description")}
                  type="success"
                  showIcon
                  icon={<SafetyOutlined />}
                  style={{ marginTop: 24 }}
                />
              </Card>
            ),
          },
          {
            key: "5",
            label: (
              <span>
                <QuestionCircleOutlined /> {t("tabs.faq")}
              </span>
            ),
            children: (
              <Card>
                <Title level={2}>
                  <QuestionCircleOutlined style={{ marginRight: 8 }} />
                  {t("faq.title")}
                </Title>
                <Paragraph>{t("faq.description")}</Paragraph>

                <Collapse
                  items={faqItems}
                  defaultActiveKey={["1"]}
                  style={{ marginTop: 32 }}
                  expandIconPosition="end"
                />

                <Divider />

                <Card type="inner" style={{ background: "#f0f5ff" }}>
                  <Title level={4}>{t("faq.needHelp.title")}</Title>
                  <Paragraph>{t("faq.needHelp.description")}</Paragraph>
                  <Space>
                    <Button type="primary" icon={<GlobalOutlined />}>
                      {t("faq.needHelp.community")}
                    </Button>
                    <Button>{t("faq.needHelp.feedback")}</Button>
                  </Space>
                </Card>
              </Card>
            ),
          },
        ]}
      />

      {/* Bottom CTA */}
      <Card style={{ marginTop: 48, textAlign: "center", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
        <Title level={2} style={{ color: "white" }}>
          {t("cta.title")}
        </Title>
        <Paragraph style={{ fontSize: 16, color: "rgba(255,255,255,0.9)" }}>{t("cta.description")}</Paragraph>
        <Button type="primary" size="large" icon={<RocketOutlined />} onClick={() => router.push(`/${locale}`)} style={{ marginTop: 16 }}>
          {t("cta.button")}
        </Button>
      </Card>
    </div>
  );
}
