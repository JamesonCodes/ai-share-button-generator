'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/contexts/ThemeContext';

type Framework = 'html' | 'react' | 'vue';

interface CodeOutputProps {
  embedScript: string;
  reactSnippet: string;
  vueSnippet: string;
}

export default function CodeOutput({ embedScript, reactSnippet, vueSnippet }: CodeOutputProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeFramework, setActiveFramework] = useState<Framework>('html');
  const { theme } = useTheme();

  const getCurrentCode = () => {
    switch (activeFramework) {
      case 'react':
        return reactSnippet;
      case 'vue':
        return vueSnippet;
      default:
        return embedScript;
    }
  };

  const getLanguage = () => {
    switch (activeFramework) {
      case 'react':
        return 'jsx';
      case 'vue':
        // Prism doesn't have built-in Vue support, use 'html' as fallback
        // since Vue templates are HTML-based
        return 'html';
      default:
        return 'html';
    }
  };

  const getHelperText = () => {
    switch (activeFramework) {
      case 'react':
        return 'Use this React component in your application';
      case 'vue':
        return 'Use this Vue component in your application';
      default:
        return 'Paste this script tag into the HTML of the page where you want the share button to appear';
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isDark = theme === 'dark';
  const currentCode = getCurrentCode();

  return (
    <div>
      {/* Framework Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700">
          {(['html', 'react', 'vue'] as Framework[]).map((framework) => (
            <button
              key={framework}
              onClick={() => setActiveFramework(framework)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeFramework === framework
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
              }`}
            >
              {framework.charAt(0).toUpperCase() + framework.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => copyToClipboard(currentCode)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            copied
              ? 'bg-green-500 dark:bg-green-600 text-white shadow-lg scale-105'
              : 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 shadow-md hover:shadow-lg'
          }`}
        >
          {copied ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>

      {/* Code Display */}
      <div className="rounded-md overflow-hidden border border-gray-800 dark:border-slate-700">
        <SyntaxHighlighter
          language={getLanguage()}
          style={isDark ? vscDarkPlus : oneLight}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {currentCode}
        </SyntaxHighlighter>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-slate-400 transition-colors">
        {getHelperText()}
      </p>
    </div>
  );
}
