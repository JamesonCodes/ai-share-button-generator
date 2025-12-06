'use client';

import { useState, useEffect } from 'react';
import type { ButtonConfig } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';
import { replacePromptPlaceholders, promptPresets, defaultPromptTemplate } from '@/lib/prompt-templates';

interface PreviewButtonProps {
  config: ButtonConfig;
}

export default function PreviewButton({ config }: PreviewButtonProps) {
  const [attributionUrl, setAttributionUrl] = useState('#');
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    // Set attribution URL after hydration to avoid mismatch
    if (typeof window !== 'undefined') {
      setAttributionUrl(window.location.origin);
      
      // Detect actual background color by checking body and html elements
      const body = document.body;
      const html = document.documentElement;
      
      const bodyStyle = window.getComputedStyle(body);
      const htmlStyle = window.getComputedStyle(html);
      
      // Try body background first, fallback to html
      const bgColor = bodyStyle.backgroundColor || htmlStyle.backgroundColor;
      
      // Check if background is transparent (handle various formats)
      const transparentPatterns = ['transparent', 'rgba(0, 0, 0, 0)', 'rgba(0,0,0,0)'];
      if (transparentPatterns.some(pattern => bgColor.toLowerCase().includes(pattern.toLowerCase()))) {
        // If transparent, assume white background (most common)
        setTextColor('#000000');
        return;
      }
      
      // Parse RGB values from rgba/rgb string (handle spaces)
      const rgbMatch = bgColor.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/i);
      
      if (!rgbMatch) {
        // Fallback: if we can't parse, default to dark text (most sites are light)
        setTextColor('#000000');
        return;
      }
      
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      const alpha = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;
      
      // If alpha is very low, treat as transparent and default to dark text
      if (alpha < 0.1) {
        setTextColor('#000000');
        return;
      }
      
      // If r=g=b=0, it's likely transparent black, default to dark text
      if (r === 0 && g === 0 && b === 0 && alpha < 1) {
        setTextColor('#000000');
        return;
      }
      
      // Calculate relative luminance (WCAG formula)
      // Normalize RGB values to 0-1 range
      const [rNorm, gNorm, bNorm] = [r, g, b].map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      
      const luminance = 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;
      
      // Return light text for dark backgrounds (luminance < 0.5), dark text for light backgrounds
      setTextColor(luminance < 0.5 ? '#E5E5E5' : '#000000');
    }
  }, []);

  const aiLabels: Record<string, string> = {
    chatgpt: 'ChatGPT',
    perplexity: 'Perplexity',
    gemini: 'Google AI',
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

  // Official brand colors for AI platforms
  const brandColors: Record<string, string> = {
    chatgpt: '#10A37F', // OpenAI/ChatGPT bright green
    perplexity: '#8B5CF6', // Perplexity purple/blue
    gemini: '#4285F4', // Google blue
  };

  const buttonStyle = config.buttonStyle || 'solid';

  // Helper function to convert hex to rgba with opacity
  const hexToRgba = (hex: string, opacity: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Get button style based on selected style mode and platform brand color
  const getButtonStyle = (ai: string) => {
    const brandColor = brandColors[ai] || 'var(--accent)';
    
    if (buttonStyle === 'outline') {
      // High-Contrast Outline style with increased visibility
      const backgroundColor = brandColor.startsWith('#') 
        ? hexToRgba(brandColor, 0.1) 
        : brandColor; // Fallback for CSS variables
      
      return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 500,
        color: brandColor,
        backgroundColor: backgroundColor,
        border: `2px solid ${brandColor}`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif',
      };
    } else {
      // Solid Fill (Default) style
      return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#FFFFFF',
        backgroundColor: brandColor,
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif',
      };
    }
  };

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
          {/* Container for label, buttons, and attribution */}
          <div className="flex flex-col items-end gap-2.5 md:gap-3 w-full md:w-auto">
            {/* Dynamic action label - appears above buttons */}
            {config.ai.length > 0 && (
              <div 
                className="text-sm font-medium transition-smooth"
                style={{ color: textColor }}
              >
                {actionName} in:
              </div>
            )}
            
            {/* Buttons container */}
            <div className="flex flex-col gap-2.5 md:gap-3 w-full md:w-auto">
              {config.ai.length > 0 ? (
                config.ai.map((ai) => (
                  <button
                    key={ai}
                    onClick={() => handleButtonClick(ai)}
                    disabled={!config.url}
                    style={{
                      ...getButtonStyle(ai),
                      minHeight: '44px',
                    }}
                    className="transition-smooth hover:brightness-95 active:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                  >
                    <span 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        marginRight: '8px',
                        color: buttonStyle === 'outline' ? brandColors[ai] || 'var(--accent)' : '#FFFFFF'
                      }}
                    >
                      <AIIcon ai={ai} className="w-4 h-4" />
                    </span>
                    {aiLabels[ai] || ai}
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

            {/* Attribution link - matches embed script behavior */}
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
                  marginTop: '4px',
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

