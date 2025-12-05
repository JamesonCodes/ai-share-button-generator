import type { ButtonConfig } from './config-validator';

/**
 * Escapes HTML attribute values to prevent XSS attacks
 */
function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Generates the embed script tag with configuration
 */
export function generateEmbedScript(config: ButtonConfig, baseUrl: string = 'https://your-domain.com'): string {
  const scriptUrl = `${baseUrl}/share.js`;
  // Join array with commas for data attribute
  const aiValue = Array.isArray(config.ai) ? config.ai.join(',') : config.ai;
  
  const attrs = [
    `data-ai="${escapeHtmlAttribute(aiValue)}"`,
  ];
  
  if (config.url) attrs.push(`data-url="${escapeHtmlAttribute(config.url)}"`);
  if (config.brandName) attrs.push(`data-brand="${escapeHtmlAttribute(config.brandName)}"`);
  if (config.promptTemplate) attrs.push(`data-prompt-template="${escapeHtmlAttribute(config.promptTemplate)}"`);
  if (config.contentType) attrs.push(`data-content-type="${escapeHtmlAttribute(config.contentType)}"`);
  if (config.buttonStyle && config.buttonStyle !== 'solid') attrs.push(`data-button-style="${escapeHtmlAttribute(config.buttonStyle)}"`);
  // Only include data-show-attribution if it's false (opt-out, default is true)
  if (config.showAttribution === false) attrs.push(`data-show-attribution="false"`);
  
  return `<script src="${scriptUrl}" ${attrs.join(' ')}></script>`;
}

/**
 * Generates React component code
 */
export function generateReactSnippet(config: ButtonConfig, baseUrl: string = 'https://your-domain.com'): string {
  const scriptUrl = `${baseUrl}/share.js`;
  const aiValue = Array.isArray(config.ai) ? config.ai.join(',') : config.ai;
  
  const attrs: string[] = [];
  attrs.push(`    script.setAttribute('data-ai', ${JSON.stringify(aiValue)});`);
  if (config.url) attrs.push(`    script.setAttribute('data-url', ${JSON.stringify(config.url)});`);
  if (config.brandName) attrs.push(`    script.setAttribute('data-brand', ${JSON.stringify(config.brandName)});`);
  if (config.promptTemplate) attrs.push(`    script.setAttribute('data-prompt-template', ${JSON.stringify(config.promptTemplate)});`);
  if (config.contentType) attrs.push(`    script.setAttribute('data-content-type', ${JSON.stringify(config.contentType)});`);
  if (config.buttonStyle && config.buttonStyle !== 'solid') attrs.push(`    script.setAttribute('data-button-style', ${JSON.stringify(config.buttonStyle)});`);
  // Only include data-show-attribution if it's false (opt-out, default is true)
  if (config.showAttribution === false) attrs.push(`    script.setAttribute('data-show-attribution', 'false');`);
  
  return `import { useEffect } from 'react';

export default function AIShareButton() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '${scriptUrl}';
${attrs.join('\n')}
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return null;
}`;
}

/**
 * Generates Vue component code
 */
export function generateVueSnippet(config: ButtonConfig, baseUrl: string = 'https://your-domain.com'): string {
  const scriptUrl = `${baseUrl}/share.js`;
  const aiValue = Array.isArray(config.ai) ? config.ai.join(',') : config.ai;
  
  const attrs: string[] = [];
  attrs.push(`    script.setAttribute('data-ai', ${JSON.stringify(aiValue)});`);
  if (config.url) attrs.push(`    script.setAttribute('data-url', ${JSON.stringify(config.url)});`);
  if (config.brandName) attrs.push(`    script.setAttribute('data-brand', ${JSON.stringify(config.brandName)});`);
  if (config.promptTemplate) attrs.push(`    script.setAttribute('data-prompt-template', ${JSON.stringify(config.promptTemplate)});`);
  if (config.contentType) attrs.push(`    script.setAttribute('data-content-type', ${JSON.stringify(config.contentType)});`);
  if (config.buttonStyle && config.buttonStyle !== 'solid') attrs.push(`    script.setAttribute('data-button-style', ${JSON.stringify(config.buttonStyle)});`);
  
  return `<template>
  <div></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  const script = document.createElement('script');
  script.src = '${scriptUrl}';
${attrs.join('\n')}
  document.body.appendChild(script);
});

onUnmounted(() => {
  const scripts = document.querySelectorAll(\`script[src="${scriptUrl}"]\`);
  scripts.forEach(script => script.remove());
});
</script>`;
}

/**
 * Generates both code snippets for the user
 */
export function generateCodeSnippets(config: ButtonConfig, baseUrl?: string) {
  const url = baseUrl || 'https://your-domain.com';
  return {
    embedScript: generateEmbedScript(config, url),
    reactSnippet: generateReactSnippet(config, url),
    vueSnippet: generateVueSnippet(config, url),
  };
}
