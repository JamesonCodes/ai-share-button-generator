import type { ButtonConfig } from './config-validator';

/**
 * Generates the embed script tag with configuration
 */
export function generateEmbedScript(config: ButtonConfig, baseUrl: string = 'https://your-domain.com'): string {
  const scriptUrl = `${baseUrl}/share.js`;
  // Join array with commas for data attribute
  const aiValue = Array.isArray(config.ai) ? config.ai.join(',') : config.ai;
  
  const attrs = [
    `data-ai="${aiValue}"`,
  ];
  
  if (config.url) attrs.push(`data-url="${config.url}"`);
  if (config.brandName) attrs.push(`data-brand="${config.brandName}"`);
  if (config.promptTemplate) attrs.push(`data-prompt-template="${config.promptTemplate.replace(/"/g, '&quot;')}"`);
  if (config.contentType) attrs.push(`data-content-type="${config.contentType}"`);
  
  return `<script src="${scriptUrl}" ${attrs.join(' ')}></script>`;
}

/**
 * Generates the manual placement HTML snippet
 */
export function generateManualPlacementSnippet(): string {
  return `<div data-ai-share-button></div>`;
}

/**
 * Generates both code snippets for the user
 */
export function generateCodeSnippets(config: ButtonConfig, baseUrl?: string) {
  return {
    embedScript: generateEmbedScript(config, baseUrl),
    manualPlacement: generateManualPlacementSnippet(),
  };
}
