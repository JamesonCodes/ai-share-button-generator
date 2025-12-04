'use client';

import { useState } from 'react';

interface CodeOutputProps {
  embedScript: string;
  manualPlacement: string;
}

export default function CodeOutput({ embedScript, manualPlacement }: CodeOutputProps) {
  const [copied, setCopied] = useState<'embed' | 'manual' | null>(null);

  const copyToClipboard = async (text: string, type: 'embed' | 'manual') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Global Header Script (Auto-detection)</label>
          <button
            onClick={() => copyToClipboard(embedScript, 'embed')}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {copied === 'embed' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 bg-gray-900 text-gray-100 rounded-md overflow-x-auto text-sm">
          <code>{embedScript}</code>
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Paste this script tag in your site&apos;s global header or footer
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Manual Placement (Optional)</label>
          <button
            onClick={() => copyToClipboard(manualPlacement, 'manual')}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {copied === 'manual' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 bg-gray-900 text-gray-100 rounded-md overflow-x-auto text-sm">
          <code>{manualPlacement}</code>
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Place this HTML where you want the button to appear (requires the script tag above)
        </p>
      </div>
    </div>
  );
}

