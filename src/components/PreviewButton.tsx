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
    claude: 'Claude',
    perplexity: 'Perplexity',
    gemini: 'Gemini',
    grok: 'Grok',
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

  // OpenAI-inspired button style
  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#FFFFFF',
    backgroundColor: 'var(--accent)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif',
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
      case 'claude':
        redirectUrl = `https://claude.ai/new?prompt=${encodedPrompt}`;
        break;
      case 'perplexity':
        redirectUrl = `https://www.perplexity.ai/?q=${encodedPrompt}`;
        break;
      case 'gemini':
        redirectUrl = `https://gemini.google.com/?prompt=${encodedPrompt}`;
        break;
      case 'grok':
        redirectUrl = `https://x.com/i/grok?q=${encodedPrompt}`;
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
          className="relative p-10 rounded-soft transition-smooth min-h-[240px] flex items-end justify-end"
          style={{ 
            backgroundColor: 'var(--background)', 
            border: '1px solid var(--border)'
          }}
        >
          {/* Floating buttons container - positioned bottom-right */}
          <div className="flex flex-col gap-3">
            {config.ai.length > 0 ? (
              config.ai.map((ai) => (
                <button
                  key={ai}
                  onClick={() => handleButtonClick(ai)}
                  disabled={!config.url}
                  style={buttonStyle}
                  className="transition-smooth hover:opacity-90 active:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>
                    <AIIcon ai={ai} className="w-4 h-4 text-white" />
                  </span>
                  {actionName} with {aiLabels[ai] || ai}
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
            <div className="text-sm">
              <span className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>URL: </span>
              <span 
                className="font-mono text-xs break-all transition-smooth" 
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

