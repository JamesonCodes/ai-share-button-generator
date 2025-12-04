// AI Share Button Embed Script
// This script is bundled and minified to public/share.js

type AIDestination = 'chatgpt' | 'claude' | 'perplexity' | 'gemini' | 'grok';

interface ButtonConfig {
  style: 'minimal' | 'icon' | 'pill';
  color: string;
  size: 'small' | 'medium' | 'large';
  ai: AIDestination[];
  action: string;
  placement: 'floating' | 'inline';
}

function getConfig(): ButtonConfig {
  const script = document.currentScript as HTMLScriptElement;
  if (!script) {
    return getDefaultConfig();
  }

  // Parse AI destinations (comma-separated)
  const aiAttr = script.getAttribute('data-ai') || 'chatgpt';
  const aiArray = aiAttr.split(',').map(a => a.trim()).filter((a): a is AIDestination => 
    ['chatgpt', 'claude', 'perplexity', 'gemini'].includes(a)
  );
  const ai = aiArray.length > 0 ? aiArray : ['chatgpt'];

  return {
    style: (script.getAttribute('data-style') as any) || 'minimal',
    color: script.getAttribute('data-color') || '#3b82f6',
    size: (script.getAttribute('data-size') as any) || 'medium',
    ai,
    action: script.getAttribute('data-action') || 'Summarize',
    placement: (script.getAttribute('data-placement') as any) || 'floating',
  };
}

function getDefaultConfig(): ButtonConfig {
  return {
    style: 'minimal',
    color: '#3b82f6',
    size: 'medium',
    ai: ['chatgpt'],
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
    case 'grok':
      return `https://x.com/i/grok?q=${encodedPrompt}`;
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

const aiLabels: Record<AIDestination, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  perplexity: 'Perplexity',
  gemini: 'Gemini',
  grok: 'Grok',
};

const aiIconSvgs: Record<AIDestination, string> = {
  chatgpt: `<svg fill="currentColor" fill-rule="evenodd" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z"></path></svg>`,
  claude: `<svg fill="currentColor" fill-rule="evenodd" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"></path></svg>`,
  perplexity: `<svg fill="currentColor" fill-rule="evenodd" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z"></path></svg>`,
  gemini: `<svg fill="currentColor" fill-rule="evenodd" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`,
  grok: `<svg fill="currentColor" fill-rule="evenodd" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"></path></svg>`,
};

function createButton(config: ButtonConfig, aiDestination: AIDestination): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = 'ai-share-button';
  
  if (config.placement === 'floating') {
    button.classList.add('ai-share-button-floating');
  }

  const actionText = config.action || 'Share';
  const buttonText = `${actionText} with ${aiLabels[aiDestination] || aiDestination}`;
  
  // Add AI logo icon
  const iconSvg = aiIconSvgs[aiDestination];
  if (iconSvg) {
    const iconWrapper = document.createElement('span');
    iconWrapper.style.cssText = 'display: inline-flex; align-items: center; margin-right: 6px;';
    iconWrapper.innerHTML = iconSvg;
    button.appendChild(iconWrapper);
  }
  
  // Add button text
  button.appendChild(document.createTextNode(buttonText));

  button.addEventListener('click', () => {
    const url = window.location.href;
    const selectedText = getSelectedText();
    const redirectUrl = buildAIRedirectUrl(aiDestination, url, selectedText, config.action);
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

  // Create buttons for each AI destination
  const buttons = config.ai.map(ai => createButton(config, ai));

  if (config.placement === 'floating') {
    // Create a container for floating buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'ai-share-button-container';
    buttonContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
    
    // Add responsive styles for mobile
    const mobileStyles = `
      @media (max-width: 768px) {
        .ai-share-button-container {
          bottom: 16px;
          right: 16px;
        }
      }
    `;
    const existingStyle = document.getElementById('ai-share-button-styles');
    if (existingStyle) {
      existingStyle.textContent += mobileStyles;
    }

    buttons.forEach(button => {
      button.classList.remove('ai-share-button-floating');
      buttonContainer.appendChild(button);
    });
    document.body.appendChild(buttonContainer);
  } else if (container) {
    // For inline placement, create a wrapper div
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'ai-share-button-wrapper';
    buttonWrapper.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px;';
    
    buttons.forEach(button => buttonWrapper.appendChild(button));

    // Replace manual marker or append to container
    if (container.hasAttribute('data-ai-share-button')) {
      container.replaceWith(buttonWrapper);
    } else {
      container.appendChild(buttonWrapper);
    }
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

