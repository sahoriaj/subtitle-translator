"use client";

import React from "react";
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
  CheckCircleOutlined,
  WarningOutlined,
  LockOutlined,
  ClockCircleOutlined,
  TranslationOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text, Link } = Typography;

export default function UserGuideClient() {
  const router = useRouter();

  // Helper function to smooth scroll to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // --- HARDCODED CONTENT FROM YOUR JSON ---

  const quickStartSteps = [
    {
      title: "Upload or Paste Subtitles",
      description: "Drag and drop your subtitle file (.srt, .ass, .vtt, .lrc) or paste the content directly into the input area",
      icon: <FileTextOutlined />,
    },
    {
      title: "Select Languages",
      description: "Choose your source language (or use auto-detect) and target language from over 60 supported languages",
      icon: <GlobalOutlined />,
    },
    {
      title: "Configure Translation API",
      description: "Select a translation service. Use the free GTX API or configure your preferred service (DeepL, OpenAI, Azure)",
      icon: <ApiOutlined />,
    },
    {
      title: "Translate & Export",
      description: "Click translate and wait for the process to complete. Export as translated-only, bilingual, or both formats",
      icon: <PlayCircleOutlined />,
    },
  ];

  const featuresList = [
    {
      title: "📦 Batch Processing",
      description: "Translate multiple subtitle files at once. Automatic parallel processing with progress tracking for each file.",
    },
    {
      title: "⏱️ Timeline Preservation",
      description: "Maintains original timing and formatting. Preserves all timestamps accurately and keeps subtitle sequence numbers.",
    },
    {
      title: "🌐 Bilingual Subtitles",
      description: "Create subtitles with original and translated text. Perfect for language learning (supports styling conversion to ASS).",
    },
    {
      title: "🗣️ 60+ Languages",
      description: "Support for major world languages including English, Chinese, Spanish, French, Japanese, Korean, and more.",
    },
    {
      title: "🔒 Privacy First",
      description: "Your data stays secure. API keys are stored locally in your browser. No server-side data storage.",
    },
    {
      title: "🧠 Context-Aware AI",
      description: "Advanced AI translation with context understanding. Better translation of idiomatic expressions and character voice consistency.",
    },
  ];

  const supportedFormats = [
    {
      name: "SRT (SubRip)",
      extension: ".srt",
      description: "The most common subtitle format, supported by virtually all video players and platforms.",
      features: ["Standard text format", "Broad compatibility", "Simple timing"],
    },
    {
      name: "ASS (Advanced SubStation Alpha)",
      extension: ".ass",
      description: "Advanced format with styling support, popular in anime fansubbing.",
      features: ["Rich text formatting", "Advanced positioning", "Styling preservation"],
    },
    {
      name: "VTT (WebVTT)",
      extension: ".vtt",
      description: "Web standard subtitle format for HTML5 video.",
      features: ["Native browser support", "Metadata support", "CSS styling"],
    },
    {
      name: "LRC (Lyrics)",
      extension: ".lrc",
      description: "Lyrics format commonly used for music and karaoke.",
      features: ["Simple time-tags", "Metadata support"],
    },
  ];

  const translationAPIs = [
    {
      name: "Google Translate (GTX)",
      icon: "🆓",
      description: "Free Google Translate API - no registration required.",
      pros: ["Completely free to use", "No API key needed"],
      cons: ["Rate limits may apply", "Less accurate for context"],
      requiresKey: false,
    },
    {
      name: "DeepL Pro",
      icon: "🔷",
      description: "Professional translation service known for high accuracy.",
      pros: ["Excellent quality", "Strong European language support", "Formal/informal tone"],
      cons: ["Requires API key (paid/free tier)"],
      requiresKey: true,
      link: "https://www.deepl.com/pro-api",
    },
    {
      name: "OpenAI (GPT)",
      icon: "🤖",
      description: "AI-powered translation using GPT models with context understanding.",
      pros: ["Context-aware translations", "Understands idioms", "Maintains dialogue consistency"],
      cons: ["Requires API key (paid)", "Higher cost per translation"],
      requiresKey: true,
      link: "https://platform.openai.com/api-keys",
    },
    {
      name: "Azure Translate",
      icon: "☁️",
      description: "Microsoft's enterprise translation service.",
      pros: ["Reliable enterprise-grade", "Wide language coverage"],
      cons: ["Requires Azure account"],
      requiresKey: true,
      link: "https://azure.microsoft.com/en-us/services/cognitive-services/translator/",
    },
  ];

  const faqItems = [
    {
      key: "1",
      label: "Is Subtitle Translator completely free?",
      children: <Paragraph>Yes! The tool itself is completely free. You can use the free Google Translate (GTX) API without any cost. For premium translation services like DeepL or OpenAI, you'll need your own API key, but those services often have free tiers available.</Paragraph>,
    },
    {
      key: "2",
      label: "How do I get an API key for DeepL or OpenAI?",
      children: <Paragraph>Visit the respective service's website (linked in the Translation APIs section), create an account, and generate an API key. DeepL offers a free tier with 500,000 characters per month, and OpenAI offers $5 in free credits for new accounts.</Paragraph>,
    },
    {
      key: "3",
      label: "Can I translate multiple subtitle files at once?",
      children: <Paragraph>Yes! Simply upload multiple files in the input area. The tool will process them sequentially and download each translated file automatically. You can also enable multi-language mode to translate one file into multiple target languages at once.</Paragraph>,
    },
    {
      key: "4",
      label: "Will my subtitle timings be preserved?",
      children: <Paragraph>Absolutely! The tool preserves all timestamps, formatting, and structure. Only the text content is translated while everything else remains exactly as it was in the original file.</Paragraph>,
    },
    {
      key: "5",
      label: "What is context-aware translation and when should I use it?",
      children: <Paragraph>Context-aware translation uses AI to understand the dialogue flow and context of your subtitles. This results in more natural translations that maintain character voice and handle idioms better. It's recommended when using LLM services (OpenAI, DeepSeek, etc.) and when translation quality is more important than speed.</Paragraph>,
    },
    {
      key: "6",
      label: "Is my data private and secure?",
      children: <Paragraph>Yes! All processing happens in your browser. Your API keys are stored locally using browser localStorage and are never sent to our servers. The subtitle content is only sent to the translation API you select (Google, DeepL, OpenAI, etc.) according to their respective privacy policies.</Paragraph>,
    },
  ];

  return (
    <div className="user-guide-container" style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 20px" }}>
      
      {/* 1. Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Title level={1} style={{ marginBottom: 16 }}>
          <QuestionCircleOutlined style={{ marginRight: 12, color: "#1890ff" }} />
          User Guide
        </Title>
        <Title level={4} type="secondary" style={{ marginTop: 0 }}>
          Complete guide to using Subtitle Translator
        </Title>
        <Paragraph style={{ fontSize: 16, maxWidth: 600, margin: "16px auto 0" }}>
          Learn how to use Subtitle Translator to translate subtitles in multiple formats with AI-powered translation services.
        </Paragraph>
      </div>

      {/* 2. Sticky Quick Navigation */}
      <div style={{ position: "sticky", top: 20, zIndex: 100, marginBottom: 48 }}>
        <Alert
          message={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontWeight: 600, marginRight: 16 }}><BulbOutlined /> Quick Navigation:</span>
              <Space wrap>
                <Button type="link" onClick={() => scrollToSection("quick-start")}>Quick Start</Button>
                <Button type="link" onClick={() => scrollToSection("features")}>Features</Button>
                <Button type="link" onClick={() => scrollToSection("formats")}>Formats</Button>
                <Button type="link" onClick={() => scrollToSection("apis")}>APIs</Button>
                <Button type="link" onClick={() => scrollToSection("faq")}>FAQ</Button>
              </Space>
            </div>
          }
          type="info"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)", border: "1px solid #e6f7ff" }}
        />
      </div>

      <Space direction="vertical" size={64} style={{ width: "100%" }}>
        
        {/* SECTION: Quick Start */}
        <div id="quick-start">
          <Card 
            title={<Title level={3} style={{ margin: 0 }}><RocketOutlined style={{ color: '#1890ff' }} /> Quick Start Guide</Title>}
            extra={<Tag color="blue">4 Steps</Tag>}
          >
            <Paragraph style={{ fontSize: 16, marginBottom: 32 }}>
              Get started with Subtitle Translator in 4 simple steps:
            </Paragraph>
            
            <Steps
              direction="vertical"
              items={quickStartSteps.map((step) => ({
                title: <span style={{ fontWeight: 600, fontSize: 16 }}>{step.title}</span>,
                description: <span style={{ color: '#666' }}>{step.description}</span>,
                icon: step.icon,
                status: 'process'
              }))}
            />

            <Divider dashed />
            
            <Alert
              message="Pro Tip"
              description="Enable 'Context-Aware Translation' for LLM services to get better translation quality by understanding dialogue context."
              type="success"
              showIcon
              icon={<BulbOutlined />}
            />

            <div style={{ marginTop: 32, textAlign: "center" }}>
              <Button type="primary" size="large" icon={<PlayCircleOutlined />} onClick={() => router.push("/")}>
                Start Translating Now
              </Button>
            </div>
          </Card>
        </div>

        {/* SECTION: Features */}
        <div id="features">
          <Card title={<Title level={3} style={{ margin: 0 }}><ThunderboltOutlined style={{ color: '#faad14' }} /> Key Features</Title>}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {featuresList.map((feature, index) => (
                <Card key={index} type="inner" title={feature.title} hoverable>
                  <Paragraph>{feature.description}</Paragraph>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* SECTION: Formats */}
        <div id="formats">
          <Card title={<Title level={3} style={{ margin: 0 }}><FileTextOutlined style={{ color: '#52c41a' }} /> Supported Formats</Title>}>
            <Paragraph style={{ marginBottom: 24 }}>
              We support all major subtitle formats used in professional and amateur video production.
            </Paragraph>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 16 }}>
              {supportedFormats.map((format, index) => (
                <Card key={index} type="inner" size="small">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Title level={5} style={{ margin: 0 }}>{format.name}</Title>
                    <Tag color="cyan">{format.extension}</Tag>
                  </div>
                  <Paragraph type="secondary" style={{ marginBottom: 12 }}>{format.description}</Paragraph>
                  <Space size={[0, 8]} wrap>
                    {format.features.map((feat, i) => (
                      <Tag key={i} icon={<CheckCircleOutlined />}>{feat}</Tag>
                    ))}
                  </Space>
                </Card>
              ))}
            </div>
            <Alert
              style={{ marginTop: 24 }}
              message="Format Conversion"
              description="When creating bilingual subtitles from SRT or VTT formats, the output is automatically converted to ASS format for better compatibility and styling support."
              type="warning"
              showIcon
            />
          </Card>
        </div>

        {/* SECTION: APIs */}
        <div id="apis">
          <Card title={<Title level={3} style={{ margin: 0 }}><ApiOutlined style={{ color: '#722ed1' }} /> Translation APIs</Title>}>
            <Paragraph>Choose the translation service that best fits your needs:</Paragraph>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 24 }}>
              {translationAPIs.map((api, index) => (
                <Card key={index} type="inner" bordered={true} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>{api.icon}</span>
                    <Title level={4} style={{ margin: 0 }}>{api.name}</Title>
                    <div style={{ marginTop: 8 }}>
                      {api.requiresKey 
                        ? <Tag color="warning">API Key Required</Tag> 
                        : <Tag color="success">Free</Tag>
                      }
                    </div>
                  </div>
                  
                  <Paragraph style={{ flex: 1, textAlign: 'center' }}>{api.description}</Paragraph>
                  
                  <Divider style={{ margin: "12px 0" }} />
                  
                  <div style={{ marginBottom: 8 }}>
                    <Text strong type="success"><CheckCircleOutlined /> Advantages:</Text>
                    <ul style={{ paddingLeft: 20, margin: "4px 0", fontSize: 13 }}>
                      {api.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  
                  <div>
                    <Text strong type="warning"><WarningOutlined /> Limitations:</Text>
                    <ul style={{ paddingLeft: 20, margin: "4px 0", fontSize: 13 }}>
                      {api.cons.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>

                  {api.link && (
                    <Button type="link" href={api.link} target="_blank" block style={{ marginTop: 16 }}>
                      Get API Key
                    </Button>
                  )}
                </Card>
              ))}
            </div>

            <Alert
              message="Your API Keys Are Safe"
              description="All API keys are stored locally in your browser using localStorage. They are never sent to our servers or shared with third parties. You have complete control over your credentials."
              type="success"
              showIcon
              icon={<LockOutlined />}
              style={{ marginTop: 32 }}
            />
          </Card>
        </div>

        {/* SECTION: FAQ */}
        <div id="faq">
          <Card title={<Title level={3} style={{ margin: 0 }}><QuestionCircleOutlined /> Frequently Asked Questions</Title>}>
            <Collapse 
              items={faqItems} 
              defaultActiveKey={['1']} 
              expandIconPosition="end"
              size="large"
            />
            <div style={{ marginTop: 24, background: '#f5f5f5', padding: 24, borderRadius: 8, textAlign: 'center' }}>
               <Title level={5}>Still Need Help?</Title>
               <Paragraph>Join our community or send us feedback if you have questions or suggestions.</Paragraph>
               <Space>
                 <Button>Join Community</Button>
                 <Button type="primary">Send Feedback</Button>
               </Space>
            </div>
          </Card>
        </div>

      </Space>

      {/* Footer CTA */}
      <Card style={{ marginTop: 80, textAlign: "center", background: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)", border: 'none' }}>
        <Title level={2} style={{ color: "white", marginBottom: 12 }}>Ready to Translate Your Subtitles?</Title>
        <Paragraph style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", maxWidth: 600, margin: "0 auto 24px" }}>
          Start translating professional-quality subtitles in seconds with our powerful translation tools.
        </Paragraph>
        <Button size="large" icon={<RocketOutlined />} onClick={() => router.push("/")} style={{ height: 48, padding: '0 32px', fontSize: 18 }}>
          Start Translating
        </Button>
      </Card>
    </div>
  );
}
