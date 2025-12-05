'use client';

import { useState, useEffect } from 'react';
import ConfigForm from '@/components/ConfigForm';
import PreviewButton from '@/components/PreviewButton';
import CodeOutput from '@/components/CodeOutput';
import ThemeToggle from '@/components/ThemeToggle';
import InstructionsAccordion from '@/components/InstructionsAccordion';
import { generateCodeSnippets } from '@/lib/button-generator';
import type { ButtonConfig } from '@/lib/config-validator';

export default function Home() {
  const [config, setConfig] = useState<ButtonConfig>({
    url: '',
    brandName: '',
    ai: ['chatgpt'],
  });

  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Get base URL from window location
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const handleConfigChange = (newConfig: ButtonConfig) => {
    setConfig(newConfig);
  };

  const { embedScript, reactSnippet, vueSnippet } = generateCodeSnippets(config, baseUrl);

  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen transition-smooth" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-6 py-16 md:px-8 md:py-20 max-w-6xl">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="mb-6 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              AI Share Button Generator
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              Create embeddable AI share buttons for your blog or website. 
              Let readers send articles to ChatGPT, Perplexity, or Google AI with one click.
            </p>
          </header>

          {/* Instructions Accordion */}
          <InstructionsAccordion />

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Column: Configuration */}
            <div 
              className="rounded-softer p-8 md:p-10 transition-smooth" 
              style={{ 
                backgroundColor: 'var(--surface)', 
                border: '1px solid var(--border)'
              }}
            >
              <h2 className="mb-8 transition-smooth" style={{ color: 'var(--text-primary)' }}>Configuration</h2>
              <ConfigForm onConfigChange={handleConfigChange} />
            </div>

            {/* Right Column: Preview and Code */}
            <div className="space-y-8">
              {/* Live Preview */}
              <div 
                className="rounded-softer p-8 md:p-10 transition-smooth" 
                style={{ 
                  backgroundColor: 'var(--surface)', 
                  border: '1px solid var(--border)'
                }}
              >
                <h2 className="mb-8 transition-smooth" style={{ color: 'var(--text-primary)' }}>Preview</h2>
                <PreviewButton config={config} />
              </div>

              {/* Embed Code */}
              <div 
                className="rounded-softer p-8 md:p-10 transition-smooth" 
                style={{ 
                  backgroundColor: 'var(--surface)', 
                  border: '1px solid var(--border)'
                }}
              >
                <h2 className="mb-8 transition-smooth" style={{ color: 'var(--text-primary)' }}>Embed Code</h2>
                <CodeOutput embedScript={embedScript} reactSnippet={reactSnippet} vueSnippet={vueSnippet} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
