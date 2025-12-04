// AI Share Button Embed Script
// This script is bundled and minified to public/share.js

interface ButtonConfig {
  style: 'minimal' | 'icon' | 'pill';
  color: string;
  size: 'small' | 'medium' | 'large';
  ai: 'chatgpt' | 'claude' | 'perplexity' | 'gemini';
  action: string;
  placement: 'floating' | 'inline';
}

function getConfig(): ButtonConfig {
  const script = document.currentScript as HTMLScriptElement;
  if (!script) {
    return getDefaultConfig();
  }

  return {
    style: (script.getAttribute('data-style') as any) || 'minimal',
    color: script.getAttribute('data-color') || '#3b82f6',
    size: (script.getAttribute('data-size') as any) || 'medium',
    ai: (script.getAttribute('data-ai') as any) || 'chatgpt',
    action: script.getAttribute('data-action') || 'Summarize',
    placement: (script.getAttribute('data-placement') as any) || 'floating',
  };
}

function getDefaultConfig(): ButtonConfig {
  return {
    style: 'minimal',
    color: '#3b82f6',
    size: 'medium',
    ai: 'chatgpt',
    action: 'Summarize',
    placement: 'floating',
  };
}

function findArticleContainer(): HTMLElement | null {
  // Check for manual marker first
  const manualMarker = document.querySelector('[data-ai-share-button]');
  if (manualMarker) {
    return manualMarker as HTMLElement;
  }

  // Check for article element
  const article = document.querySelector('article');
  if (article) {
    return article;
  }

  // Check common blog selectors
  const selectors = [
    '.post-content',
    '.blog-article',
    '.prose',
    '[role="article"]',
    '.entry-content',
    '.article-content',
    '.content',
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      return element as HTMLElement;
    }
  }

  return null;
}

function buildAIRedirectUrl(destination: string, url: string, text: string, action: string): string {
  let prompt = `Analyze the following content from this URL: ${url}`;
  if (text) {
    prompt += `. Text selection: ${text}`;
  }
  if (action) {
    prompt += `. ${action}`;
  }

  const encodedPrompt = encodeURIComponent(prompt);

  switch (destination) {
    case 'chatgpt':
      return `https://chat.openai.com/?q=${encodedPrompt}`;
    case 'claude':
      return `https://claude.ai/new?prompt=${encodedPrompt}`;
    case 'perplexity':
      return `https://www.perplexity.ai/?q=${encodedPrompt}`;
    case 'gemini':
      return `https://gemini.google.com/?prompt=${encodedPrompt}`;
    default:
      return `https://chat.openai.com/?q=${encodedPrompt}`;
  }
}

function getSelectedText(): string {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return '';
  }
  return selection.toString().trim();
}

function getButtonStyles(config: ButtonConfig): string {
  const sizeMap = {
    small: { padding: '6px 12px', fontSize: '12px' },
    medium: { padding: '8px 16px', fontSize: '14px' },
    large: { padding: '12px 24px', fontSize: '16px' },
  };

  const size = sizeMap[config.size];
  const baseStyles = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${size.padding};
    font-size: ${size.fontSize};
    font-weight: 500;
    color: white;
    background-color: ${config.color};
    border: none;
    border-radius: ${config.style === 'pill' ? '9999px' : '6px'};
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  `;

  const hoverStyles = `
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;

  return `
    .ai-share-button {
      ${baseStyles}
    }
    .ai-share-button:hover {
      ${hoverStyles}
    }
    .ai-share-button:active {
      transform: translateY(0);
    }
    .ai-share-button-floating {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 768px) {
      .ai-share-button-floating {
        bottom: 16px;
        right: 16px;
      }
    }
  `;
}

function createButton(config: ButtonConfig): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = 'ai-share-button';
  
  if (config.placement === 'floating') {
    button.classList.add('ai-share-button-floating');
  }

  const buttonText = config.action || 'Share with AI';
  
  if (config.style === 'icon') {
    // Create SVG element safely
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.style.marginRight = '6px';
    
    const paths = [
      'M12 2L2 7l10 5 10-5-10-5z',
      'M2 17l10 5 10-5',
      'M2 12l10 5 10-5',
    ];
    
    paths.forEach((d) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    
    button.appendChild(svg);
    // Use textContent to safely insert user-provided text
    button.appendChild(document.createTextNode(buttonText));
  } else {
    button.textContent = buttonText;
  }

  button.addEventListener('click', () => {
    const url = window.location.href;
    const selectedText = getSelectedText();
    const redirectUrl = buildAIRedirectUrl(config.ai, url, selectedText, config.action);
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  });

  return button;
}

function injectStyles(css: string): void {
  const styleId = 'ai-share-button-styles';
  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}

function init(): void {
  const config = getConfig();
  const container = findArticleContainer();

  if (!container && config.placement === 'inline') {
    // Can't find container for inline placement, skip
    return;
  }

  // Inject styles
  const styles = getButtonStyles(config);
  injectStyles(styles);

  // Create button
  const button = createButton(config);

  if (config.placement === 'floating') {
    document.body.appendChild(button);
  } else if (container) {
    // Replace manual marker or append to container
    if (container.hasAttribute('data-ai-share-button')) {
      container.replaceWith(button);
    } else {
      container.appendChild(button);
    }
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

