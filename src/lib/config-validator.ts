export type AIDestination = 'chatgpt' | 'claude' | 'perplexity' | 'gemini' | 'grok';
export type ButtonStyle = 'solid' | 'outline';

export interface ButtonConfig {
  url: string;
  brandName: string;
  ai: AIDestination[];
  promptTemplate?: string;
  contentType?: string;
  buttonStyle?: ButtonStyle;
}

/**
 * Validates button configuration
 */
export function validateConfig(config: Partial<ButtonConfig>): ButtonConfig {
  // Handle ai as string (legacy) or array
  // Filter to only supported platforms: chatgpt, perplexity, gemini
  // Keep backward compatibility for old embeds with claude/grok
  const supportedPlatforms: AIDestination[] = ['chatgpt', 'perplexity', 'gemini'];
  const allPlatforms: AIDestination[] = ['chatgpt', 'claude', 'perplexity', 'gemini', 'grok'];
  
  let aiArray: AIDestination[] = ['chatgpt'];
  if (config.ai) {
    if (Array.isArray(config.ai)) {
      // Filter to supported platforms, but allow all for backward compatibility
      aiArray = config.ai.filter((a): a is AIDestination => 
        allPlatforms.includes(a)
      ).filter(a => supportedPlatforms.includes(a)); // Only keep supported ones
      if (aiArray.length === 0) aiArray = ['chatgpt'];
    } else if (typeof config.ai === 'string' && allPlatforms.includes(config.ai as AIDestination)) {
      // Legacy support: single string, but filter to supported
      if (supportedPlatforms.includes(config.ai as AIDestination)) {
        aiArray = [config.ai as AIDestination];
      } else {
        aiArray = ['chatgpt']; // Fallback if unsupported platform
      }
    }
  }

  return {
    url: config.url || '',
    brandName: config.brandName || '',
    ai: aiArray,
    promptTemplate: config.promptTemplate,
    contentType: config.contentType,
    buttonStyle: config.buttonStyle || 'solid',
  };
}

/**
 * Parses configuration from script tag data attributes
 */
export function parseConfigFromScript(scriptElement: HTMLScriptElement): ButtonConfig {
  const aiAttr = scriptElement.getAttribute('data-ai');
  let aiArray: AIDestination[] = ['chatgpt'];
  if (aiAttr) {
    // Support comma-separated list: "chatgpt,perplexity"
    const aiList = aiAttr.split(',').map(a => a.trim()).filter(Boolean);
    if (aiList.length > 0) {
      // Filter to supported platforms only
      const supportedPlatforms: AIDestination[] = ['chatgpt', 'perplexity', 'gemini'];
      aiArray = aiList.filter((a): a is AIDestination => 
        ['chatgpt', 'claude', 'perplexity', 'gemini', 'grok'].includes(a)
      ).filter(a => supportedPlatforms.includes(a)) as AIDestination[];
      if (aiArray.length === 0) aiArray = ['chatgpt'];
    }
  }

  const config: Partial<ButtonConfig> = {
    ai: aiArray,
    url: scriptElement.getAttribute('data-url') || undefined,
    brandName: scriptElement.getAttribute('data-brand') || undefined,
    promptTemplate: scriptElement.getAttribute('data-prompt-template') || undefined,
    contentType: scriptElement.getAttribute('data-content-type') || undefined,
    buttonStyle: (scriptElement.getAttribute('data-button-style') as ButtonStyle) || 'solid',
  };

  return validateConfig(config);
}
