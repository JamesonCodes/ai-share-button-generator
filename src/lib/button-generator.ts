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
  if (config.brandColor) attrs.push(`data-brand-color="${config.brandColor}"`);
  
  return `<script src="${scriptUrl}" ${attrs.join(' ')}></script>`;
}

/**
 * Generates React component code
 */
export function generateReactSnippet(config: ButtonConfig, baseUrl: string = 'https://your-domain.com'): string {
  const scriptUrl = `${baseUrl}/share.js`;
  const aiValue = Array.isArray(config.ai) ? config.ai.join(',') : config.ai;
  
  const attrs: string[] = [];
  attrs.push(`    script.setAttribute('data-ai', '${aiValue}');`);
  if (config.url) attrs.push(`    script.setAttribute('data-url', '${config.url.replace(/'/g, "\\'")}');`);
  if (config.brandName) attrs.push(`    script.setAttribute('data-brand', '${config.brandName.replace(/'/g, "\\'")}');`);
  if (config.promptTemplate) attrs.push(`    script.setAttribute('data-prompt-template', ${JSON.stringify(config.promptTemplate)});`);
  if (config.contentType) attrs.push(`    script.setAttribute('data-content-type', '${config.contentType.replace(/'/g, "\\'")}');`);
  if (config.brandColor) attrs.push(`    script.setAttribute('data-brand-color', '${config.brandColor}');`);
  
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
  attrs.push(`    script.setAttribute('data-ai', '${aiValue}');`);
  if (config.url) attrs.push(`    script.setAttribute('data-url', '${config.url.replace(/'/g, "\\'")}');`);
  if (config.brandName) attrs.push(`    script.setAttribute('data-brand', '${config.brandName.replace(/'/g, "\\'")}');`);
  if (config.promptTemplate) attrs.push(`    script.setAttribute('data-prompt-template', ${JSON.stringify(config.promptTemplate)});`);
  if (config.contentType) attrs.push(`    script.setAttribute('data-content-type', '${config.contentType.replace(/'/g, "\\'")}');`);
  if (config.brandColor) attrs.push(`    script.setAttribute('data-brand-color', '${config.brandColor}');`);
  
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
