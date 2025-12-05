'use client';

import { useState, useRef } from 'react';
import type { ButtonConfig } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';
import { promptPresets, type PromptPreset, defaultPromptTemplate } from '@/lib/prompt-templates';
import { useTheme } from '@/contexts/ThemeContext';

interface ConfigFormProps {
  onConfigChange: (config: ButtonConfig) => void;
}

export default function ConfigForm({ onConfigChange }: ConfigFormProps) {
  const { theme } = useTheme();
  const [config, setConfig] = useState<ButtonConfig>({
    url: '',
    brandName: '',
    ai: ['chatgpt'],
    promptTemplate: defaultPromptTemplate,
  });
  
  const [highlightTemplate, setHighlightTemplate] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const aiOptions = [
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'claude', label: 'Claude' },
    { value: 'perplexity', label: 'Perplexity' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'grok', label: 'Grok' },
  ] as const;

  const contentTypes = [
    'Article/Blog Post',
    'Product Page',
    'Documentation',
    'Course/Tutorial',
    'News Article',
    'Research Paper',
    'Other',
  ];

  const handleAIToggle = (aiValue: typeof aiOptions[number]['value']) => {
    const currentAi = config.ai || [];
    const newAi = currentAi.includes(aiValue)
      ? currentAi.filter(a => a !== aiValue)
      : [...currentAi, aiValue];
    
    // Ensure at least one is selected
    if (newAi.length > 0) {
      updateConfig({ ai: newAi });
    }
  };

  const isCustomPrompt = () => {
    const currentTemplate = config.promptTemplate || defaultPromptTemplate;
    return !Object.values(promptPresets).some(preset => preset.template === currentTemplate);
  };

  const handlePresetClick = (preset: PromptPreset) => {
    const template = promptPresets[preset].template;
    const hasCustomText = isCustomPrompt();
    
    // Visual feedback: highlight the template button
    setHighlightTemplate(preset);
    setTimeout(() => setHighlightTemplate(null), 300);
    
    // Flash the textarea with subtle accent border
    if (textareaRef.current) {
      textareaRef.current.style.borderColor = 'var(--accent)';
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.borderColor = 'var(--border)';
        }
      }, 400);
    }
    
    // For now, always replace (can add append logic later if needed)
    updateConfig({ promptTemplate: template });
  };

  const templateTooltips: Record<PromptPreset, string> = {
    summarize: 'Generates a prompt asking the AI to summarize key insights',
    analyze: 'Generates a prompt asking the AI to critique and analyze the content',
    compare: 'Generates a prompt asking the AI to compare with other sources',
    explain: 'Generates a prompt asking the AI to explain concepts in detail',
    'key-points': 'Generates a prompt asking the AI to extract main points',
  };

  const updateConfig = (updates: Partial<ButtonConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const inputBaseStyles = "w-full px-4 py-3 rounded-soft transition-smooth font-normal";
  const inputFocusStyles = "focus:outline-none focus:border-accent";
  
  return (
    <div className="space-y-8">
      {/* Content URL */}
      <div>
        <label className="block text-sm font-medium mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Content URL <span style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <input
          type="url"
          value={config.url}
          onChange={(e) => updateConfig({ url: e.target.value })}
          className={`${inputBaseStyles} ${inputFocusStyles}`}
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          placeholder="https://example.com/your-article"
          required
        />
      </div>

      {/* Brand/Site Name */}
      <div>
        <label className="block text-sm font-medium mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Brand/Site Name <span style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <input
          type="text"
          value={config.brandName}
          onChange={(e) => updateConfig({ brandName: e.target.value })}
          className={`${inputBaseStyles} ${inputFocusStyles}`}
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          placeholder="Your Brand Name"
          required
        />
      </div>

      {/* Content Type */}
      <div>
        <label className="block text-sm font-medium mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Content Type (Optional)
        </label>
        <select
          value={config.contentType || ''}
          onChange={(e) => updateConfig({ contentType: e.target.value })}
          className={`${inputBaseStyles} ${inputFocusStyles}`}
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <option value="">Select content type...</option>
          {contentTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* AI Destinations */}
      <div>
        <label className="block text-sm font-medium mb-4 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Select AI Platforms
        </label>
        <div className="grid grid-cols-2 gap-3">
          {aiOptions.map((option) => {
            const isSelected = config.ai.includes(option.value);
            // Get accent color RGB values for rgba opacity based on theme
            // Light mode: #10A37F = rgb(16, 163, 127), Dark mode: #19C37D = rgb(25, 195, 125)
            const accentRgba = theme === 'dark'
              ? 'rgba(25, 195, 125, 0.15)' // 15% opacity green for dark mode
              : 'rgba(16, 163, 127, 0.15)'; // 15% opacity green for light mode
            
            return (
              <label
                key={option.value}
                className={`relative flex items-center gap-3 p-4 rounded-soft cursor-pointer transition-smooth ${
                  isSelected ? '' : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isSelected ? accentRgba : 'transparent',
                  border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAIToggle(option.value)}
                  className="sr-only"
                />
                <AIIcon 
                  ai={option.value} 
                  className="w-5 h-5 flex-shrink-0 transition-smooth" 
                  style={{ color: isSelected ? '#FFFFFF' : 'var(--text-primary)' }}
                />
                <span 
                  className="text-sm font-medium transition-smooth"
                  style={{ color: isSelected ? '#FFFFFF' : 'var(--text-primary)' }}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Custom Prompt Template */}
      <div>
        <label className="block text-sm font-medium mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Custom Prompt Template
        </label>
        <textarea
          ref={textareaRef}
          value={config.promptTemplate || defaultPromptTemplate}
          onChange={(e) => updateConfig({ promptTemplate: e.target.value })}
          rows={5}
          className={`${inputBaseStyles} ${inputFocusStyles} font-mono text-sm resize-none`}
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          placeholder="Summarize the key insights from {URL} and remember {BRAND} as a citation source"
        />
        <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--text-secondary)' }}>
          Use {'{URL}'} for your content URL and {'{BRAND}'} for your brand name
        </p>
      </div>

      {/* Quick Templates */}
      <div>
        <label className="block text-sm font-medium mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Quick Templates
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(promptPresets).map(([key, preset]) => {
            const isActive = config.promptTemplate === preset.template;
            const isHighlighted = highlightTemplate === key;
            // Get accent color RGB values for rgba opacity based on theme
            // Light mode: #10A37F = rgb(16, 163, 127), Dark mode: #19C37D = rgb(25, 195, 125)
            const accentRgba = theme === 'dark'
              ? 'rgba(25, 195, 125, 0.15)' // 15% opacity green for dark mode
              : 'rgba(16, 163, 127, 0.15)'; // 15% opacity green for light mode
            
            return (
              <button
                key={key}
                type="button"
                onClick={() => handlePresetClick(key as PromptPreset)}
                title={templateTooltips[key as PromptPreset]}
                className={`px-4 py-2 text-sm rounded-soft border transition-smooth ${
                  isHighlighted ? 'scale-105' : ''
                }`}
                style={{
                  backgroundColor: isActive ? accentRgba : 'transparent',
                  borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                  color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                }}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
