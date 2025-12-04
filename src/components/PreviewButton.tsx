'use client';

import type { ButtonConfig } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';

interface PreviewButtonProps {
  config: ButtonConfig;
}

export default function PreviewButton({ config }: PreviewButtonProps) {
  const sizeMap = {
    small: 'px-3 py-1.5 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium text-white rounded transition-all';
  const sizeClasses = sizeMap[config.size];
  const styleClasses = config.style === 'pill' ? 'rounded-full' : 'rounded-md';

  const buttonStyle = {
    backgroundColor: config.color,
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
      <div className="flex flex-wrap gap-2">
        {config.ai.map((ai) => (
          <button
            key={ai}
            className={`${baseClasses} ${sizeClasses} ${styleClasses} gap-1.5`}
            style={buttonStyle}
            disabled
          >
            <AIIcon ai={ai} className="w-4 h-4" />
            {config.action || 'Share'} with {aiLabels[ai] || ai}
          </button>
        ))}
      </div>
    </div>
  );
}

