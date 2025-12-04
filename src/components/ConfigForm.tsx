'use client';

import { useState } from 'react';
import type { ButtonConfig } from '@/lib/config-validator';

interface ConfigFormProps {
  onConfigChange: (config: ButtonConfig) => void;
}

export default function ConfigForm({ onConfigChange }: ConfigFormProps) {
  const [config, setConfig] = useState<ButtonConfig>({
    style: 'minimal',
    color: '#3b82f6',
    size: 'medium',
    ai: 'chatgpt',
    action: 'Summarize',
    placement: 'floating',
  });

  const updateConfig = (updates: Partial<ButtonConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Button Style</label>
        <select
          value={config.style}
          onChange={(e) => updateConfig({ style: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="minimal">Minimal</option>
          <option value="icon">Icon</option>
          <option value="pill">Pill</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={config.color}
            onChange={(e) => updateConfig({ color: e.target.value })}
            className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={config.color}
            onChange={(e) => updateConfig({ color: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#3b82f6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Size</label>
        <select
          value={config.size}
          onChange={(e) => updateConfig({ size: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">AI Destination</label>
        <select
          value={config.ai}
          onChange={(e) => updateConfig({ ai: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="chatgpt">ChatGPT</option>
          <option value="claude">Claude</option>
          <option value="perplexity">Perplexity</option>
          <option value="gemini">Gemini</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Action Text</label>
        <input
          type="text"
          value={config.action}
          onChange={(e) => updateConfig({ action: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Summarize, Analyze, Explain..."
        />
        <p className="mt-1 text-sm text-gray-600">
          This text will appear on the button and in the AI prompt
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Placement</label>
        <select
          value={config.placement}
          onChange={(e) => updateConfig({ placement: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="floating">Floating (Bottom Right)</option>
          <option value="inline">Inline (End of Article)</option>
        </select>
      </div>
    </div>
  );
}

