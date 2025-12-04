'use client';

import type { ButtonConfig } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';

interface PreviewButtonProps {
  config: ButtonConfig;
}

export default function PreviewButton({ config }: PreviewButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium text-white rounded transition-all px-4 py-2 text-sm rounded-md gap-1.5';

  const buttonStyle = {
    backgroundColor: '#3b82f6',
  };

  const aiLabels: Record<string, string> = {
    chatgpt: 'ChatGPT',
    claude: 'Claude',
    perplexity: 'Perplexity',
    gemini: 'Gemini',
    grok: 'Grok',
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700 transition-colors">
      <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 transition-colors">Preview:</p>
      <div className="space-y-4">
        {config.url && (
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Content URL:</p>
            <p className="text-sm text-gray-900 dark:text-slate-100 font-mono break-all">{config.url}</p>
          </div>
        )}
        {config.brandName && (
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Brand:</p>
            <p className="text-sm text-gray-900 dark:text-slate-100">{config.brandName}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {config.ai.map((ai) => (
            <button
              key={ai}
              className={baseClasses}
              style={buttonStyle}
              disabled
            >
              <AIIcon ai={ai} className="w-4 h-4" />
              Share with {aiLabels[ai] || ai}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
