'use client';

import type { ButtonConfig } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';
import { replacePromptPlaceholders, promptPresets, defaultPromptTemplate } from '@/lib/prompt-templates';

interface PreviewButtonProps {
  config: ButtonConfig;
}

export default function PreviewButton({ config }: PreviewButtonProps) {
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
          {/* Dynamic action label - appears above buttons */}
          {config.ai.length > 0 && (
            <div 
              className="mb-4 text-sm font-medium transition-smooth self-end"
              style={{ color: 'var(--text-primary)' }}
            >
              {actionName} in:
            </div>
          )}
          
          {/* Floating buttons container - positioned bottom-right */}
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

