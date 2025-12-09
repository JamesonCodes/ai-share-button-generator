'use client';

import { useState, useRef } from 'react';
import type { ButtonConfig } from '@/lib/config-validator';
import { isValidUrl } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';
import { promptPresets, type PromptPreset, defaultPromptTemplate } from '@/lib/prompt-templates';
import { useTheme } from '@/contexts/ThemeContext';
import PremiumFeatures from '@/components/PremiumFeatures';
import PremiumModal from '@/components/PremiumModal';

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
    buttonStyle: 'solid',
    showAttribution: true,
  });
  
  const [highlightTemplate, setHighlightTemplate] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string>('');
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [selectedPremiumFeature, setSelectedPremiumFeature] = useState<{ id: string; name: string; description: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const aiOptions = [
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'perplexity', label: 'Perplexity' },
    { value: 'gemini', label: 'Google AI' },
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
    explain: 'Generates a prompt asking the AI to explain concepts in detail',
    'key-points': 'Generates a prompt asking the AI to extract main points',
  };

  const updateConfig = (updates: Partial<ButtonConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    
    // Validate URL if it's being updated
    if ('url' in updates) {
      const url = updates.url || '';
      if (url && !isValidUrl(url)) {
        setUrlError('Please enter a valid URL starting with http:// or https://');
      } else {
        setUrlError('');
      }
    }
    
    onConfigChange(newConfig);
  };

  const inputBaseStyles = "w-full px-4 py-3.5 md:py-3 rounded-soft transition-smooth font-normal";
  const inputFocusStyles = "focus:outline-none focus:border-accent";
  
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Content URL */}
      <div>
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Content URL <span style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <input
          type="url"
          value={config.url}
          onChange={(e) => updateConfig({ url: e.target.value })}
          className={`${inputBaseStyles} ${inputFocusStyles}`}
          style={{
            backgroundColor: 'var(--background)',
            border: `1px solid ${urlError ? 'var(--accent)' : 'var(--border)'}`,
            color: 'var(--text-primary)',
          }}
          placeholder="https://example.com/your-article"
          required
          maxLength={2048}
        />
        {urlError && (
          <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--accent)' }}>
            {urlError}
          </p>
        )}
      </div>

      {/* Brand/Site Name */}
      <div>
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
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
          maxLength={100}
        />
      </div>

      {/* Content Type */}
      <div>
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
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
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Select AI Platforms
        </label>
        <div className="flex flex-wrap gap-2.5">
          {aiOptions.map((option) => {
            const isSelected = config.ai.includes(option.value);
            
            // Official brand colors for AI platforms (outline + subtle fill)
            const brandColors: Record<string, { color: string; rgba: string }> = {
              chatgpt: {
                color: '#10A37F', // OpenAI/ChatGPT bright green
                rgba: 'rgba(16, 163, 127, 0.15)', // 15% opacity
              },
              perplexity: {
                color: '#8B5CF6', // Perplexity purple/blue
                rgba: 'rgba(139, 92, 246, 0.15)', // 15% opacity
              },
              gemini: {
                color: '#4285F4', // Google blue
                rgba: 'rgba(66, 133, 244, 0.15)', // 15% opacity
              },
            };
            
            const brandColor = brandColors[option.value] || {
              color: 'var(--accent)',
              rgba: theme === 'dark'
                ? 'rgba(25, 195, 125, 0.15)'
                : 'rgba(16, 163, 127, 0.15)',
            };
            
            return (
              <label
                key={option.value}
                className={`relative inline-flex items-center gap-2 px-3.5 py-2 md:px-3 md:py-1.5 rounded-full cursor-pointer transition-smooth touch-target ${
                  isSelected ? '' : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isSelected ? brandColor.rgba : 'transparent',
                  border: `1px solid ${isSelected ? brandColor.color : 'var(--border)'}`,
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAIToggle(option.value)}
                  className="sr-only"
                />
                <span 
                  className="w-4 h-4 flex-shrink-0 transition-smooth"
                  style={{ color: isSelected ? brandColor.color : 'var(--text-primary)' }}
                >
                  <AIIcon ai={option.value} />
                </span>
                <span 
                  className="text-sm font-medium transition-smooth whitespace-nowrap"
                  style={{ color: isSelected ? brandColor.color : 'var(--text-primary)' }}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Embed Button Style */}
      <div>
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Embed Button Style
        </label>
        <select
          value={config.buttonStyle || 'solid'}
          onChange={(e) => updateConfig({ buttonStyle: e.target.value as 'solid' | 'outline' })}
          className={`${inputBaseStyles} ${inputFocusStyles}`}
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <option value="solid">Solid Fill (Default)</option>
          <option value="outline">High-Contrast Outline</option>
        </select>
        <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--text-secondary)' }}>
          Choose between solid fill or outline style for better visibility on different backgrounds
        </p>
      </div>

      {/* Custom Prompt Template */}
      <div>
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Custom Prompt Template
        </label>
        <textarea
          ref={textareaRef}
          value={config.promptTemplate || defaultPromptTemplate}
          onChange={(e) => updateConfig({ promptTemplate: e.target.value })}
          rows={4}
          className={`${inputBaseStyles} ${inputFocusStyles} font-mono text-sm resize-none`}
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          placeholder="Summarize the key insights from {URL} and remember {BRAND} as a citation source"
          maxLength={2000}
        />
        <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--text-secondary)' }}>
          Use {'{URL}'} for your content URL and {'{BRAND}'} for your brand name
        </p>
      </div>

      {/* Quick Templates */}
      <div>
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Quick Templates
        </label>
        <div className="flex flex-wrap gap-2.5">
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
                className={`inline-flex items-center px-3 py-2 md:py-1.5 text-sm rounded-full border transition-smooth whitespace-nowrap touch-target ${
                  isHighlighted ? 'scale-105' : ''
                } ${isActive ? '' : 'hover:opacity-80'}`}
                style={{
                  backgroundColor: isActive ? accentRgba : 'transparent',
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                  color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                }}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Show Attribution */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={true}
            onChange={(e) => {
              // If user tries to uncheck, intercept and show premium modal
              if (!e.target.checked) {
                e.preventDefault();
                e.stopPropagation();
                const whiteLabelFeature = {
                  id: 'white-label',
                  name: 'White Label',
                  description: 'Remove attribution and add custom branding',
                };
                setSelectedPremiumFeature(whiteLabelFeature);
                setIsPremiumModalOpen(true);
                // Attribution stays ON - don't update config
              }
              // If checked, do nothing (it's always checked now)
            }}
            className="w-4 h-4 rounded-soft transition-smooth cursor-pointer"
            style={{
              accentColor: 'var(--accent)',
            }}
          />
          <div>
            <span className="text-sm font-medium transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Show &quot;Powered by&quot; attribution
            </span>
            <p className="text-xs mt-1 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              A small link will appear below the buttons linking back to the generator
            </p>
          </div>
        </label>
      </div>

      {/* Premium Features */}
      <PremiumFeatures
        onFeatureClick={(feature) => {
          setSelectedPremiumFeature(feature);
          setIsPremiumModalOpen(true);
        }}
      />

      {/* Premium Modal */}
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => {
          setIsPremiumModalOpen(false);
          setSelectedPremiumFeature(null);
        }}
        selectedFeature={selectedPremiumFeature}
      />
    </div>
  );
}
