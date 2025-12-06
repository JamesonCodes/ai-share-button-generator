'use client';

import { useState } from 'react';

export default function InstructionsAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  const instructions = [
    'Enter your content URL and brand name',
    'Customize your prompt template or use a preset (Summarize, Analyze, etc.)',
    'Select which AI platforms you want to share to',
    'Copy the generated script code',
    'Paste it into the HTML of the specific page where you want the share button',
    'The button will share that specific URL with your custom prompt',
  ];

  return (
    <div 
      className="mb-8 md:mb-16 rounded-softer transition-smooth overflow-hidden" 
      style={{ 
        backgroundColor: 'var(--surface)', 
        border: '1px solid var(--border)'
      }}
    >
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 md:px-10 py-5 md:py-6 flex items-center justify-between text-left transition-smooth hover:opacity-80 touch-target"
        style={{ color: 'var(--text-primary)' }}
      >
        <h3 className="text-lg font-medium transition-smooth">
          How to Use this Generator
        </h3>
        <svg
          className={`w-5 h-5 transition-smooth flex-shrink-0 ml-4`}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--text-secondary)',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 md:px-10 pb-6 md:pb-10">
          <ol className="list-decimal list-inside space-y-2.5 md:space-y-3 transition-smooth" style={{ color: 'var(--text-secondary)' }}>
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
