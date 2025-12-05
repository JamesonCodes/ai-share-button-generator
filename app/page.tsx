'use client';

import { useState, useEffect } from 'react';
import ConfigForm from '@/components/ConfigForm';
import PreviewButton from '@/components/PreviewButton';
import CodeOutput from '@/components/CodeOutput';
import ThemeToggle from '@/components/ThemeToggle';
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
          <header className="text-center mb-16 md:mb-20">
            <h1 className="mb-6 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              AI Share Button Generator
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              Create embeddable AI share buttons for your blog or website. 
              Let readers send articles to ChatGPT, Claude, or other AI models with one click.
            </p>
          </header>

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

          {/* Instructions */}
          <div 
            className="mt-12 md:mt-16 rounded-softer p-8 md:p-10 transition-smooth" 
            style={{ 
              backgroundColor: 'var(--surface)', 
              border: '1px solid var(--border)'
            }}
          >
            <h3 className="mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>How to Use</h3>
            <ol className="list-decimal list-inside space-y-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              <li>Enter your content URL and brand name</li>
              <li>Customize your prompt template or use a preset (Summarize, Analyze, etc.)</li>
              <li>Select which AI platforms you want to share to</li>
              <li>Copy the generated script code</li>
              <li>Paste it into the HTML of the specific page where you want the share button</li>
              <li>The button will share that specific URL with your custom prompt</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
