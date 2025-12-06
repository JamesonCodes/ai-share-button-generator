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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-6">
        <div className="flex gap-1 transition-smooth w-full md:w-auto" style={{ borderBottom: '1px solid var(--border)' }}>
          {(['html', 'react', 'vue'] as Framework[]).map((framework) => (
            <button
              key={framework}
              onClick={() => setActiveFramework(framework)}
              className={`flex-1 md:flex-none px-4 py-3 md:py-2 text-sm font-medium transition-smooth border-b-2 -mb-px touch-target ${
                activeFramework === framework ? '' : 'hover:opacity-80'
              }`}
              style={{
                borderBottomColor: activeFramework === framework ? 'var(--accent)' : 'transparent',
                color: activeFramework === framework ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {framework.charAt(0).toUpperCase() + framework.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => copyToClipboard(currentCode)}
          className={`w-full md:w-auto px-5 py-3 md:py-2.5 text-sm font-medium rounded-soft transition-smooth flex items-center justify-center gap-2 touch-target ${
            copied ? 'scale-105' : 'hover:opacity-90 active:opacity-95'
          }`}
          style={{
            backgroundColor: copied ? '#10A37F' : 'var(--accent)',
            color: '#FFFFFF',
          }}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Display */}
      <div className="rounded-soft overflow-hidden transition-smooth" style={{ border: '1px solid var(--border)' }}>
        <div className="overflow-x-auto p-4 md:p-5" style={{ background: isDark ? '#1E1E1E' : '#FAFAFA' }}>
        <SyntaxHighlighter
          language={getLanguage()}
          style={isDark ? vscDarkPlus : oneLight}
          customStyle={{
            margin: 0,
              padding: 0,
              fontSize: '0.75rem',
            lineHeight: '1.6',
              background: 'transparent',
              minWidth: 'fit-content',
            }}
            codeTagProps={{
              style: {
                fontSize: 'inherit',
              }
          }}
        >
          {currentCode}
        </SyntaxHighlighter>
      </div>
      </div>
      <p className="mt-3 text-xs md:text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
        {getHelperText()}
      </p>
    </div>
  );
}
