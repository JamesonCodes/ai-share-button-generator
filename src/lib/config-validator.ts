export type AIDestination = 'chatgpt' | 'claude' | 'perplexity' | 'gemini' | 'grok';

export interface ButtonConfig {
  url: string;
  brandName: string;
  ai: AIDestination[];
  promptTemplate?: string;
  contentType?: string;
}

/**
 * Validates button configuration
 */
export function validateConfig(config: Partial<ButtonConfig>): ButtonConfig {
  // Handle ai as string (legacy) or array
  let aiArray: AIDestination[] = ['chatgpt'];
  if (config.ai) {
    if (Array.isArray(config.ai)) {
      aiArray = config.ai.filter((a): a is AIDestination => 
        ['chatgpt', 'claude', 'perplexity', 'gemini', 'grok'].includes(a)
      );
      if (aiArray.length === 0) aiArray = ['chatgpt'];
    } else if (typeof config.ai === 'string' && ['chatgpt', 'claude', 'perplexity', 'gemini', 'grok'].includes(config.ai)) {
      // Legacy support: single string
      aiArray = [config.ai as AIDestination];
    }
  }

  return {
    url: config.url || '',
    brandName: config.brandName || '',
    ai: aiArray,
    promptTemplate: config.promptTemplate,
    contentType: config.contentType,
  };
}

/**
 * Parses configuration from script tag data attributes
 */
export function parseConfigFromScript(scriptElement: HTMLScriptElement): ButtonConfig {
  const aiAttr = scriptElement.getAttribute('data-ai');
  let ai: AIDestination[] | string | undefined;
  if (aiAttr) {
    // Support comma-separated list: "chatgpt,claude"
    const aiList = aiAttr.split(',').map(a => a.trim()).filter(Boolean);
    if (aiList.length > 0) {
      ai = aiList as AIDestination[];
    } else {
      // Legacy: single value
      ai = aiAttr as AIDestination;
    }
  }

  const config: Partial<ButtonConfig> = {
    ai,
    url: scriptElement.getAttribute('data-url') || undefined,
    brandName: scriptElement.getAttribute('data-brand') || undefined,
    promptTemplate: scriptElement.getAttribute('data-prompt-template') || undefined,
    contentType: scriptElement.getAttribute('data-content-type') || undefined,
  };

  return validateConfig(config);
}
