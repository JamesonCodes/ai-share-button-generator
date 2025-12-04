export type AIDestination = 'chatgpt' | 'claude' | 'perplexity' | 'gemini';

export interface ButtonConfig {
  style: 'minimal' | 'icon' | 'pill';
  color: string;
  size: 'small' | 'medium' | 'large';
  ai: AIDestination[];
  action: string;
  placement: 'floating' | 'inline';
}

/**
 * Validates button configuration
 */
export function validateConfig(config: Partial<ButtonConfig>): ButtonConfig {
  const defaultConfig: ButtonConfig = {
    style: 'minimal',
    color: '#3b82f6',
    size: 'medium',
    ai: ['chatgpt'],
    action: 'Summarize',
    placement: 'floating',
  };

  // Handle ai as string (legacy) or array
  let aiArray: AIDestination[] = defaultConfig.ai;
  if (config.ai) {
    if (Array.isArray(config.ai)) {
      aiArray = config.ai.filter((a): a is AIDestination => 
        ['chatgpt', 'claude', 'perplexity', 'gemini'].includes(a)
      );
      if (aiArray.length === 0) aiArray = defaultConfig.ai;
    } else if (typeof config.ai === 'string' && ['chatgpt', 'claude', 'perplexity', 'gemini'].includes(config.ai)) {
      // Legacy support: single string
      aiArray = [config.ai as AIDestination];
    }
  }

  return {
    style: (config.style && ['minimal', 'icon', 'pill'].includes(config.style))
      ? config.style
      : defaultConfig.style,
    color: config.color || defaultConfig.color,
    size: (config.size && ['small', 'medium', 'large'].includes(config.size))
      ? config.size
      : defaultConfig.size,
    ai: aiArray,
    action: config.action || defaultConfig.action,
    placement: (config.placement && ['floating', 'inline'].includes(config.placement))
      ? config.placement
      : defaultConfig.placement,
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
    style: (scriptElement.getAttribute('data-style') as any) || undefined,
    color: scriptElement.getAttribute('data-color') || undefined,
    size: (scriptElement.getAttribute('data-size') as any) || undefined,
    ai,
    action: scriptElement.getAttribute('data-action') || undefined,
    placement: (scriptElement.getAttribute('data-placement') as any) || undefined,
  };

  return validateConfig(config);
}

