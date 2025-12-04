'use client';

import { useState, useEffect } from 'react';
import ConfigForm from '@/components/ConfigForm';
import PreviewButton from '@/components/PreviewButton';
import CodeOutput from '@/components/CodeOutput';
import { generateCodeSnippets } from '@/lib/button-generator';
import type { ButtonConfig } from '@/lib/config-validator';

export default function Home() {
  const [config, setConfig] = useState<ButtonConfig>({
    style: 'minimal',
    color: '#3b82f6',
    size: 'medium',
    ai: 'chatgpt',
    action: 'Summarize',
    placement: 'floating',
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

  const { embedScript, manualPlacement } = generateCodeSnippets(config, baseUrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Share Button Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create embeddable AI share buttons for your blog or website. 
            Let readers send articles to ChatGPT, Claude, or other AI models with one click.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Configuration</h2>
            <ConfigForm onConfigChange={handleConfigChange} />
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preview</h2>
            <PreviewButton config={config} />
          </div>
        </div>

        {/* Code Output */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Embed Code</h2>
          <CodeOutput embedScript={embedScript} manualPlacement={manualPlacement} />
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Configure your button style, color, size, and AI destination above</li>
            <li>Copy the &quot;Global Header Script&quot; code</li>
            <li>Paste it into your site&apos;s global header or footer (WordPress: Header & Footer plugin, Webflow: Site Settings → Custom Code)</li>
            <li>The button will automatically appear on pages with blog post content</li>
            <li>For manual placement, use the &quot;Manual Placement&quot; snippet in your template</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

