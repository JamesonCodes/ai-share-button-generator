export interface ButtonConfig {
  style: 'minimal' | 'icon' | 'pill';
  color: string;
  size: 'small' | 'medium' | 'large';
  ai: 'chatgpt' | 'claude' | 'perplexity' | 'gemini';
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
    ai: 'chatgpt',
    action: 'Summarize',
    placement: 'floating',
  };

  return {
    style: (config.style && ['minimal', 'icon', 'pill'].includes(config.style))
      ? config.style
      : defaultConfig.style,
    color: config.color || defaultConfig.color,
    size: (config.size && ['small', 'medium', 'large'].includes(config.size))
      ? config.size
      : defaultConfig.size,
    ai: (config.ai && ['chatgpt', 'claude', 'perplexity', 'gemini'].includes(config.ai))
      ? config.ai
      : defaultConfig.ai,
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
  const config: Partial<ButtonConfig> = {
    style: (scriptElement.getAttribute('data-style') as any) || undefined,
    color: scriptElement.getAttribute('data-color') || undefined,
    size: (scriptElement.getAttribute('data-size') as any) || undefined,
    ai: (scriptElement.getAttribute('data-ai') as any) || undefined,
    action: scriptElement.getAttribute('data-action') || undefined,
    placement: (scriptElement.getAttribute('data-placement') as any) || undefined,
  };

  return validateConfig(config);
}

