'use client';

import type { ButtonConfig } from '@/lib/config-validator';

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

  return (
    <div className="p-8 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-600 mb-4">Preview:</p>
      <button
        className={`${baseClasses} ${sizeClasses} ${styleClasses}`}
        style={buttonStyle}
        disabled
      >
        {config.style === 'icon' && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mr-1.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        )}
        {config.action || 'Share with AI'}
      </button>
    </div>
  );
}

