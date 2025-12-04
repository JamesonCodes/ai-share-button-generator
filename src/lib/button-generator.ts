import type { ButtonConfig } from './config-validator';

/**
 * Generates the embed script tag with configuration
 */
export function generateEmbedScript(config: ButtonConfig, baseUrl: string = 'https://your-domain.com'): string {
  const scriptUrl = `${baseUrl}/share.js`;
  
  return `<script src="${scriptUrl}" 
          data-style="${config.style}"
          data-color="${config.color}"
          data-size="${config.size}"
          data-ai="${config.ai}"
          data-action="${config.action}"
          data-placement="${config.placement}"></script>`;
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

