'use client';

import type { ButtonConfig } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';

interface PreviewButtonProps {
  config: ButtonConfig;
}

export default function PreviewButton({ config }: PreviewButtonProps) {
  const aiLabels: Record<string, string> = {
    chatgpt: 'ChatGPT',
    claude: 'Claude',
    perplexity: 'Perplexity',
    gemini: 'Gemini',
    grok: 'Grok',
  };

  // Style matching the embed script
  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 500,
    color: 'white',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 transition-colors">
          Button Preview
        </h3>
        <div className="relative p-8 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700 transition-colors min-h-[200px]">
          {/* Mock page background */}
          <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg opacity-50"></div>
          
          {/* Floating buttons container - positioned bottom-right */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            {config.ai.map((ai) => (
              <button
                key={ai}
                style={buttonStyle}
                disabled
                className="hover:opacity-90 hover:transform hover:-translate-y-0.5 hover:shadow-lg active:transform active:translate-y-0"
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '6px' }}>
                  <AIIcon ai={ai} className="w-4 h-4 text-white" />
                </span>
                Share with {aiLabels[ai] || ai}
              </button>
            ))}
          </div>
          
          {/* Indicator text */}
          <div className="absolute top-2 left-2 text-xs text-gray-400 dark:text-slate-500">
            Buttons appear here (bottom-right)
          </div>
        </div>
      </div>
      
      {/* Configuration summary */}
      <div className="space-y-2 text-sm">
        {config.url && (
          <div>
            <span className="text-gray-500 dark:text-slate-400">URL: </span>
            <span className="text-gray-900 dark:text-slate-100 font-mono text-xs break-all">{config.url}</span>
          </div>
        )}
        {config.brandName && (
          <div>
            <span className="text-gray-500 dark:text-slate-400">Brand: </span>
            <span className="text-gray-900 dark:text-slate-100">{config.brandName}</span>
          </div>
        )}
      </div>
    </div>
  );
}

