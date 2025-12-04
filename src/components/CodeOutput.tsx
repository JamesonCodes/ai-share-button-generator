'use client';

import { useState } from 'react';

interface CodeOutputProps {
  embedScript: string;
}

export default function CodeOutput({ embedScript }: CodeOutputProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 transition-colors">
          Embed Script
        </label>
        <button
          onClick={() => copyToClipboard(embedScript)}
          className="px-3 py-1 text-sm bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 bg-gray-900 dark:bg-slate-950 text-gray-100 dark:text-slate-200 rounded-md overflow-x-auto text-sm border border-gray-800 dark:border-slate-700 transition-colors">
        <code>{embedScript}</code>
      </pre>
      <p className="mt-2 text-sm text-gray-600 dark:text-slate-400 transition-colors">
        Paste this script tag into the HTML of the page where you want the share button to appear
      </p>
    </div>
  );
}
