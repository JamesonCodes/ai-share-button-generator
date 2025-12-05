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

  // OpenAI-inspired button style
  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#FFFFFF',
    backgroundColor: 'var(--accent)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  return (
    <div className="space-y-6">
      <div>
        <div 
          className="relative p-10 rounded-soft transition-smooth min-h-[240px] flex items-end justify-end"
          style={{ 
            backgroundColor: 'var(--background)', 
            border: '1px solid var(--border)'
          }}
        >
          {/* Floating buttons container - positioned bottom-right */}
          <div className="flex flex-col gap-3">
            {config.ai.length > 0 ? (
              config.ai.map((ai) => (
                <button
                  key={ai}
                  style={buttonStyle}
                  disabled
                  className="transition-smooth hover:opacity-90 active:opacity-95"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>
                    <AIIcon ai={ai} className="w-4 h-4 text-white" />
                  </span>
                  Share with {aiLabels[ai] || ai}
                </button>
              ))
            ) : (
              <div 
                className="px-4 py-2 rounded-soft text-sm transition-smooth"
                style={{ 
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--surface)',
                  border: '1px dashed var(--border)'
                }}
              >
                Select AI platforms to preview
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Configuration summary */}
      {config.url || config.brandName ? (
        <div className="space-y-3 pt-4 border-t transition-smooth" style={{ borderColor: 'var(--border)' }}>
          {config.url && (
            <div className="text-sm">
              <span className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>URL: </span>
              <span 
                className="font-mono text-xs break-all transition-smooth" 
                style={{ color: 'var(--text-primary)' }}
              >
                {config.url}
              </span>
            </div>
          )}
          {config.brandName && (
            <div className="text-sm">
              <span className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>Brand: </span>
              <span className="transition-smooth" style={{ color: 'var(--text-primary)' }}>
                {config.brandName}
              </span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

