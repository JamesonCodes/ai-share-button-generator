'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Do AI share buttons actually work?',
    answer: 'The evidence is anecdotal but promising. The low implementation cost makes it a compelling feature to test and track for lift in LLM traffic.',
  },
  {
    question: 'Will this manipulate AI systems?',
    answer: 'No. This is legitimate user behavior—people seeking AI summaries of content. It is akin to social sharing buttons, which have been standard practice for years.',
  },
  {
    question: 'Which AI platforms should I include?',
    answer: 'Start with ChatGPT, Perplexity, Google AI, and Grok due to their high visibility and integration capabilities.',
  },
  {
    question: 'Where should I put these buttons?',
    answer: 'We recommend the sidebar or at the end of articles. Avoid placing them above the fold where they might seem spammy.',
  },
  {
    question: 'Why don\'t I see the share buttons on mobile?',
    answer: 'The AI share buttons are designed for desktop use and are hidden on mobile devices (screens ≤600px wide) to provide a cleaner mobile experience.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="rounded-soft transition-smooth overflow-hidden"
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Question Button */}
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left transition-smooth hover:opacity-80"
            style={{ color: 'var(--text-primary)' }}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="text-base font-medium transition-smooth pr-4">
              {item.question}
            </h3>
            <svg
              className={`w-5 h-5 transition-smooth flex-shrink-0`}
              style={{
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                color: 'var(--text-secondary)',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Answer Content */}
          <div
            id={`faq-answer-${index}`}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: openIndex === index ? '500px' : '0px',
              opacity: openIndex === index ? 1 : 0,
            }}
          >
            <div className="px-6 pb-5">
              <p className="transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
