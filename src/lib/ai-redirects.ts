export type AIDestination = 'chatgpt' | 'claude' | 'perplexity' | 'gemini' | 'grok';

export interface RedirectParams {
  url: string;
  text?: string;
  actionText?: string;
}

/**
 * Builds a ChatGPT URL with pre-filled prompt
 */
export function buildChatGPTUrl(params: RedirectParams): string {
  const { url, text, actionText } = params;
  let prompt = `Analyze the following content from this URL: ${url}`;
  
  if (text) {
    prompt += `. Text selection: ${text}`;
  }
  
  if (actionText) {
    prompt += `. ${actionText}`;
  }
  
  // ChatGPT uses a custom URL scheme or web interface
  // Using the web interface with query parameter
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://chat.openai.com/?q=${encodedPrompt}`;
}

/**
 * Builds a Claude URL with pre-filled prompt
 */
export function buildClaudeUrl(params: RedirectParams): string {
  const { url, text, actionText } = params;
  let prompt = `Analyze the following content from this URL: ${url}`;
  
  if (text) {
    prompt += `. Text selection: ${text}`;
  }
  
  if (actionText) {
    prompt += `. ${actionText}`;
  }
  
  // Claude web interface
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://claude.ai/new?prompt=${encodedPrompt}`;
}

/**
 * Builds a Perplexity URL with pre-filled prompt
 */
export function buildPerplexityUrl(params: RedirectParams): string {
  const { url, text, actionText } = params;
  let prompt = `Analyze the following content from this URL: ${url}`;
  
  if (text) {
    prompt += `. Text selection: ${text}`;
  }
  
  if (actionText) {
    prompt += `. ${actionText}`;
  }
  
  // Perplexity uses query parameter
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://www.perplexity.ai/?q=${encodedPrompt}`;
}

/**
 * Builds a Gemini URL with pre-filled prompt
 */
export function buildGeminiUrl(params: RedirectParams): string {
  const { url, text, actionText } = params;
  let prompt = `Analyze the following content from this URL: ${url}`;
  
  if (text) {
    prompt += `. Text selection: ${text}`;
  }
  
  if (actionText) {
    prompt += `. ${actionText}`;
  }
  
  // Gemini web interface
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://gemini.google.com/?prompt=${encodedPrompt}`;
}

/**
 * Builds a Grok URL with pre-filled prompt
 */
export function buildGrokUrl(params: RedirectParams): string {
  const { url, text, actionText } = params;
  let prompt = `Analyze the following content from this URL: ${url}`;
  
  if (text) {
    prompt += `. Text selection: ${text}`;
  }
  
  if (actionText) {
    prompt += `. ${actionText}`;
  }
  
  // Grok (X/Twitter) web interface
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://x.com/i/grok?q=${encodedPrompt}`;
}

/**
 * Builds redirect URL based on AI destination
 */
export function buildAIRedirectUrl(
  destination: AIDestination,
  params: RedirectParams
): string {
  switch (destination) {
    case 'chatgpt':
      return buildChatGPTUrl(params);
    case 'claude':
      return buildClaudeUrl(params);
    case 'perplexity':
      return buildPerplexityUrl(params);
    case 'gemini':
      return buildGeminiUrl(params);
    case 'grok':
      return buildGrokUrl(params);
    default:
      return buildChatGPTUrl(params);
  }
}

