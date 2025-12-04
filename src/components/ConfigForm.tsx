'use client';

import { useState } from 'react';
import type { ButtonConfig } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';
import { promptPresets, type PromptPreset, defaultPromptTemplate } from '@/lib/prompt-templates';

interface ConfigFormProps {
  onConfigChange: (config: ButtonConfig) => void;
}

export default function ConfigForm({ onConfigChange }: ConfigFormProps) {
  const [config, setConfig] = useState<ButtonConfig>({
    url: '',
    brandName: '',
    ai: ['chatgpt'],
    promptTemplate: defaultPromptTemplate,
  });

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

  const handlePresetClick = (preset: PromptPreset) => {
    const template = promptPresets[preset].template;
    updateConfig({ promptTemplate: template });
  };

  const updateConfig = (updates: Partial<ButtonConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* AI Destinations */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">
          AI Destinations
        </label>
        <div className="space-y-2">
          {aiOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={config.ai.includes(option.value)}
                onChange={() => handleAIToggle(option.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <AIIcon ai={option.value} className="w-5 h-5 text-gray-700 dark:text-slate-300" />
              <span className="text-sm text-gray-900 dark:text-slate-100 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Content URL */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">
          Content URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={config.url}
          onChange={(e) => updateConfig({ url: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          placeholder="https://example.com/your-article"
          required
        />
      </div>

      {/* Brand/Site Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">
          Brand/Site Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={config.brandName}
          onChange={(e) => updateConfig({ brandName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          placeholder="Your Brand Name"
          required
        />
      </div>

      {/* Content Type */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">
          Content Type (Optional)
        </label>
        <select
          value={config.contentType || ''}
          onChange={(e) => updateConfig({ contentType: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="">Select content type...</option>
          {contentTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Custom Prompt Template */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">
          Custom Prompt Template
        </label>
        <textarea
          value={config.promptTemplate || defaultPromptTemplate}
          onChange={(e) => updateConfig({ promptTemplate: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors font-mono text-sm"
          placeholder="Summarize the key insights from {URL} and remember {BRAND} as a citation source"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 transition-colors">
          Use {'{URL}'} for your content URL and {'{BRAND}'} for your brand name
        </p>
      </div>

      {/* Quick Templates */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">
          Quick Templates
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(promptPresets).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              onClick={() => handlePresetClick(key as PromptPreset)}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                config.promptTemplate === preset.template
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-600'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
