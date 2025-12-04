'use client';

import { useState } from 'react';
import type { ButtonConfig } from '@/lib/config-validator';
import { AIIcon } from '@/lib/icons';

interface ConfigFormProps {
  onConfigChange: (config: ButtonConfig) => void;
}

export default function ConfigForm({ onConfigChange }: ConfigFormProps) {
  const [config, setConfig] = useState<ButtonConfig>({
    style: 'minimal',
    color: '#3b82f6',
    size: 'medium',
    ai: ['chatgpt'],
    action: 'Summarize',
    placement: 'floating',
  });

  const aiOptions = [
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'claude', label: 'Claude' },
    { value: 'perplexity', label: 'Perplexity' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'grok', label: 'Grok' },
  ] as const;

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

  const updateConfig = (updates: Partial<ButtonConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">Button Style</label>
        <select
          value={config.style}
          onChange={(e) => updateConfig({ style: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="minimal">Minimal</option>
          <option value="icon">Icon</option>
          <option value="pill">Pill</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.color}
            onChange={(e) => updateConfig({ color: e.target.value })}
            className="w-16 h-10 border border-gray-300 dark:border-slate-600 rounded cursor-pointer transition-colors"
          />
          <input
            type="text"
            value={config.color}
            onChange={(e) => updateConfig({ color: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            placeholder="#3b82f6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">Size</label>
        <select
          value={config.size}
          onChange={(e) => updateConfig({ size: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">AI Destinations</label>
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
        <p className="mt-2 text-xs text-gray-500 dark:text-slate-400 transition-colors">
          Select one or more AI destinations. Multiple buttons will be created.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">Action Text</label>
        <input
          type="text"
          value={config.action}
          onChange={(e) => updateConfig({ action: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          placeholder="Summarize, Analyze, Explain..."
        />
        <p className="mt-1 text-sm text-gray-600 dark:text-slate-400 transition-colors">
          This text will appear on the button and in the AI prompt
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-slate-100 mb-2 transition-colors">Placement</label>
        <select
          value={config.placement}
          onChange={(e) => updateConfig({ placement: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          <option value="floating">Floating (Bottom Right)</option>
          <option value="inline">Inline (End of Article)</option>
        </select>
      </div>
    </div>
  );
}

