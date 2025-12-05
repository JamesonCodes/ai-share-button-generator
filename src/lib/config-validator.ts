export type AIDestination = 'chatgpt' | 'claude' | 'perplexity' | 'gemini' | 'grok';
export type ButtonStyle = 'solid' | 'outline';

export interface ButtonConfig {
  url: string;
  brandName: string;
  ai: AIDestination[];
  promptTemplate?: string;
  contentType?: string;
  buttonStyle?: ButtonStyle;
  showAttribution?: boolean;
}

const ALLOWED_CONTENT_TYPES = [
  'Article/Blog Post',
  'Product Page',
  'Documentation',
  'Course/Tutorial',
  'News Article',
  'Research Paper',
  'Other',
];

/**
 * Validates if a string is a valid HTTP/HTTPS URL
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Sanitizes a string by removing HTML tags and dangerous characters
 */
function sanitizeString(value: string, maxLength: number = 1000): string {
  if (!value || typeof value !== 'string') {
    return '';
  }
  
  // Remove HTML tags
  let sanitized = value.replace(/<[^>]*>/g, '');
  
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  // Trim and limit length
  sanitized = sanitized.trim();
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Sanitizes brand name with stricter rules
 */
function sanitizeBrandName(value: string): string {
  if (!value || typeof value !== 'string') {
    return '';
  }
  
  // Remove HTML tags
  let sanitized = value.replace(/<[^>]*>/g, '');
  
  // Remove control characters
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
  
  // Limit to 100 characters
  sanitized = sanitized.trim();
  if (sanitized.length > 100) {
    sanitized = sanitized.substring(0, 100);
  }
  
  return sanitized;
}

/**
 * Sanitizes prompt template
 */
function sanitizePromptTemplate(value: string): string {
  if (!value || typeof value !== 'string') {
    return '';
  }
  
  // Remove HTML tags
  let sanitized = value.replace(/<[^>]*>/g, '');
  
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
  
  // Limit to 2000 characters
  sanitized = sanitized.trim();
  if (sanitized.length > 2000) {
    sanitized = sanitized.substring(0, 2000);
  }
  
  return sanitized;
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

  // Validate and sanitize URL
  let url = config.url || '';
  if (url && !isValidUrl(url)) {
    url = ''; // Invalid URL, set to empty
  }
  
  // Sanitize brand name
  const brandName = sanitizeBrandName(config.brandName || '');
  
  // Sanitize prompt template
  const promptTemplate = config.promptTemplate 
    ? sanitizePromptTemplate(config.promptTemplate)
    : undefined;
  
  // Validate content type against allowed list
  let contentType = config.contentType;
  if (contentType && !ALLOWED_CONTENT_TYPES.includes(contentType)) {
    contentType = undefined;
  }
  
  // Validate button style
  const buttonStyle: ButtonStyle = 
    config.buttonStyle === 'outline' ? 'outline' : 'solid';
  
  // Show attribution by default (opt-out)
  const showAttribution = config.showAttribution !== false;

  return {
    url,
    brandName,
    ai: aiArray,
    promptTemplate,
    contentType,
    buttonStyle,
    showAttribution,
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

  // Parse show-attribution attribute (defaults to true if not present)
  const showAttributionAttr = scriptElement.getAttribute('data-show-attribution');
  const showAttribution = showAttributionAttr === null || showAttributionAttr === 'true';

  const config: Partial<ButtonConfig> = {
    ai: aiArray,
    url: scriptElement.getAttribute('data-url') || undefined,
    brandName: scriptElement.getAttribute('data-brand') || undefined,
    promptTemplate: scriptElement.getAttribute('data-prompt-template') || undefined,
    contentType: scriptElement.getAttribute('data-content-type') || undefined,
    buttonStyle: (scriptElement.getAttribute('data-button-style') as ButtonStyle) || 'solid',
    showAttribution,
  };

  return validateConfig(config);
}
