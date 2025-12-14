'use client';

import { useState, useEffect } from 'react';
import type { ButtonConfig } from '@/lib/config-validator';
import { replacePromptPlaceholders, promptPresets, defaultPromptTemplate } from '@/lib/prompt-templates';
import { useTheme } from '@/contexts/ThemeContext';

interface PreviewButtonProps {
  config: ButtonConfig;
}

export default function PreviewButton({ config }: PreviewButtonProps) {
  const [attributionUrl, setAttributionUrl] = useState('#');
  const [textColor, setTextColor] = useState('#000000');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const resolveTextColor = () => {
      const body = document.body;
      const html = document.documentElement;
      const bodyStyle = window.getComputedStyle(body);
      const htmlStyle = window.getComputedStyle(html);
      const bgColor = bodyStyle.backgroundColor || htmlStyle.backgroundColor;
      const transparentPatterns = ['transparent', 'rgba(0, 0, 0, 0)', 'rgba(0,0,0,0)'];
      if (transparentPatterns.some(pattern => bgColor.toLowerCase().includes(pattern.toLowerCase()))) {
        return '#000000';
      }
      const rgbMatch = bgColor.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/i);
      if (!rgbMatch) {
        return '#000000';
      }
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      const alpha = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;
      if (alpha < 0.1) {
        return '#000000';
      }
      if (r === 0 && g === 0 && b === 0 && alpha < 1) {
        return '#000000';
      }
      const [rNorm, gNorm, bNorm] = [r, g, b].map(val => {
        let normalized = val / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
      });
      const luminance = 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;
      return luminance < 0.5 ? '#E5E5E5' : '#000000';
    };

    const frame = window.requestAnimationFrame(() => {
      setAttributionUrl(window.location.origin);
      setTextColor(resolveTextColor());
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const aiLabels: Record<string, string> = {
    chatgpt: 'ChatGPT',
    perplexity: 'Perplexity',
    gemini: 'Google AI',
  };

  // Map AI destinations to icon file names
  const aiIconFileMap: Record<string, string> = {
    chatgpt: 'chatgpt',
    perplexity: 'perplexity',
    gemini: 'google',
  };

  // Get icon path based on theme
  const getIconPath = (ai: string): string => {
    const iconName = aiIconFileMap[ai] || 'chatgpt';
    const themeMode = theme === 'dark' ? 'dark' : 'light';
    return `/icons/ai/${iconName}-${themeMode}-mode.svg`;
  };

  // Get the preset name from the current prompt template
  const getActionName = (): string => {
    const currentTemplate = config.promptTemplate || defaultPromptTemplate;
    
    // Check if current template matches any preset
    for (const [key, preset] of Object.entries(promptPresets)) {
      if (preset.template === currentTemplate) {
        return preset.name;
      }
    }
    
    // If no preset matches, use "Share"
    return 'Share';
  };

  const actionName = getActionName();

  const handleButtonClick = (ai: string) => {
    if (!config.url) {
      return; // Don't redirect if URL is not set
    }

    const defaultTemplate = 'Analyze the following content from this URL: {URL}';
    const template = config.promptTemplate || defaultTemplate;
    
    // Replace placeholders in the prompt template
    const prompt = replacePromptPlaceholders(
      template,
      config.url,
      config.brandName
    );

    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);

    // Build redirect URL based on AI destination (matching share.ts logic)
    let redirectUrl: string;
    switch (ai) {
      case 'chatgpt':
        redirectUrl = `https://chat.openai.com/?q=${encodedPrompt}`;
        break;
      case 'perplexity':
        redirectUrl = `https://www.perplexity.ai/?q=${encodedPrompt}`;
        break;
      case 'gemini':
        redirectUrl = `https://www.google.com/search?udm=50&aep=11&q=${encodedPrompt}`;
        break;
      default:
        redirectUrl = `https://chat.openai.com/?q=${encodedPrompt}`;
    }

    // Open in new window
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <div>
        <div 
          className="relative p-6 md:p-10 rounded-soft transition-smooth min-h-[180px] md:min-h-[240px] flex flex-col items-end justify-end"
          style={{ 
            backgroundColor: 'var(--background)', 
            border: '1px solid var(--border)'
          }}
        >
          {/* Container for buttons and attribution */}
          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            {/* Circular icon-only buttons container */}
            <div 
              className="flex flex-col-reverse gap-3 items-end"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              {config.ai.length > 0 ? (() => {
                // Sort to ensure ChatGPT is first
                const sortedAI = [...config.ai].sort((a, b) => {
                  if (a === 'chatgpt') return -1;
                  if (b === 'chatgpt') return 1;
                  return 0;
                });
                
                return sortedAI.map((ai, index) => {
                  const isFirst = index === 0;
                  const shouldShow = isFirst || isExpanded;
                  
                  return (
                    <div
                      key={ai}
                      className="relative transition-all duration-300 ease-out"
                      style={{
                        opacity: shouldShow ? 1 : 0,
                        transform: shouldShow 
                          ? 'translateY(0) scale(1)' 
                          : 'translateY(20px) scale(0.8)',
                        pointerEvents: shouldShow ? 'auto' : 'none',
                      }}
                      onMouseEnter={() => setHoveredButton(ai)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      <button
                        onClick={() => handleButtonClick(ai)}
                        disabled={!config.url}
                        className="transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E5E5',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        }}
                      >
                        <img
                          src={getIconPath(ai)}
                          alt={aiLabels[ai] || ai}
                          width={24}
                          height={24}
                          className="block"
                          style={{ width: '24px', height: '24px', display: 'block' }}
                        />
                      </button>
                      {/* Tooltip */}
                      <div
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-none whitespace-nowrap z-50"
                        style={{
                          opacity: hoveredButton === ai ? 1 : 0,
                          transform: hoveredButton === ai 
                            ? 'translateY(-50%) translateX(-4px)' 
                            : 'translateY(-50%)',
                        }}
                      >
                        <div
                          className="bg-white border border-[#E5E5E5] rounded-md px-3 py-2 text-sm font-medium text-[#1A1A1A] shadow-md relative"
                          style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                          }}
                        >
                          {actionName} in {aiLabels[ai] || ai}
                          {/* Arrow pointer */}
                          <div
                            className="absolute left-full top-1/2 -translate-y-1/2"
                            style={{
                              width: 0,
                              height: 0,
                              borderTop: '6px solid transparent',
                              borderBottom: '6px solid transparent',
                              borderLeft: '6px solid #FFFFFF',
                              filter: 'drop-shadow(1px 0 0 #E5E5E5)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                });
              })() : (
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
            
            {/* Attribution link below buttons (after ChatGPT) */}
            {config.showAttribution !== false && config.ai.length > 0 && (
              <a
                href={attributionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-share-attribution transition-smooth"
                style={{
                  fontSize: '10px',
                  color: textColor,
                  textDecoration: 'none',
                  opacity: 0.7,
                  transition: 'opacity 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.7';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Get your own AI Share Button
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Configuration summary */}
      {config.url || config.brandName ? (
        <div className="space-y-3 pt-4 border-t transition-smooth" style={{ borderColor: 'var(--border)' }}>
          {config.url && (
            <div className="text-xs md:text-sm">
              <span className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>URL: </span>
              <span 
                className="font-mono text-xs break-url transition-smooth" 
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
