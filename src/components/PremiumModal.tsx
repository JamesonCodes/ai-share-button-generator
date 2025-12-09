'use client';

import { useState, useEffect } from 'react';

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
}

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFeature: PremiumFeature | null;
}

const allFeatures = [
  { id: 'analytics', name: 'Analytics Dashboard' },
  { id: 'custom-themes', name: 'Custom Themes' },
  { id: 'white-label', name: 'White Label' },
];

export default function PremiumModal({ isOpen, onClose, selectedFeature }: PremiumModalProps) {
  const [email, setEmail] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [hasConsented, setHasConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize selectedFeatures when modal opens with a selected feature
  useEffect(() => {
    if (isOpen && selectedFeature) {
      setSelectedFeatures([selectedFeature.id]);
    } else if (isOpen && !selectedFeature) {
      setSelectedFeatures([]);
    }
    // Reset consent when modal opens/closes
    if (!isOpen) {
      setHasConsented(false);
    }
  }, [isOpen, selectedFeature]);

  if (!isOpen) return null;

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      setSubmitStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setSubmitStatus('error');
      return;
    }

    if (selectedFeatures.length === 0) {
      setErrorMessage('Please select at least one feature');
      setSubmitStatus('error');
      return;
    }

    if (!hasConsented) {
      setErrorMessage('Please agree to the privacy policy to continue');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/premium/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          features: selectedFeatures,
          source: 'premium-features-fake-door',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to join waitlist');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setSelectedFeatures([]);
    setHasConsented(false);
    setSubmitStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-smooth"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={handleClose}
    >
      <div
        className="w-full mx-4 max-w-sm md:max-w-md rounded-softer p-6 md:p-8 transition-smooth"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold transition-smooth" style={{ color: 'var(--text-primary)' }}>
              Join the Waitlist
            </h3>
            <button
              onClick={handleClose}
              className="p-2 md:p-1 rounded-soft transition-smooth hover:opacity-80 touch-target"
              style={{ color: 'var(--text-secondary)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {selectedFeature && (
            <p className="text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              {selectedFeature.id === 'white-label' 
                ? 'White-label is a premium feature. Join the waitlist to be notified when it launches!'
                : `Get notified when ${selectedFeature.name} launches`}
            </p>
          )}
        </div>

        {/* Form */}
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto transition-smooth"
                style={{ color: 'var(--accent)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-lg font-medium mb-2 transition-smooth" style={{ color: 'var(--text-primary)' }}>
              You're on the list!
            </h4>
            <p className="text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
              We'll notify you when premium features are available.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Feature Selection */}
            <div>
              <label className="block text-sm font-medium mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
                Which features interest you?
              </label>
              <div className="space-y-2">
                {allFeatures.map((feature) => (
                  <label
                    key={feature.id}
                    className="flex items-center gap-3 p-3.5 md:p-3 rounded-soft cursor-pointer transition-smooth hover:opacity-80 touch-target"
                    style={{
                      backgroundColor: selectedFeatures.includes(feature.id) ? 'var(--background)' : 'transparent',
                      border: `1px solid ${selectedFeatures.includes(feature.id) ? 'var(--accent)' : 'var(--border)'}`,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature.id)}
                      onChange={() => handleFeatureToggle(feature.id)}
                      className="w-5 h-5 md:w-4 md:h-4 rounded-soft transition-smooth cursor-pointer"
                      style={{
                        accentColor: 'var(--accent)',
                      }}
                    />
                    <span className="text-sm transition-smooth" style={{ color: 'var(--text-primary)' }}>
                      {feature.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
                Email Address <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage('');
                  setSubmitStatus('idle');
                }}
                className="w-full px-4 py-3 rounded-soft transition-smooth font-normal focus:outline-none focus:border-accent"
                style={{
                  backgroundColor: 'var(--background)',
                  border: `1px solid ${errorMessage && !hasConsented ? 'var(--accent)' : 'var(--border)'}`,
                  color: 'var(--text-primary)',
                }}
                placeholder="your@email.com"
                required
                disabled={isSubmitting}
              />
              <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                We'll only use your email to notify you about premium feature launches. You can unsubscribe at any time.
              </p>
              {errorMessage && (
                <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--accent)' }}>
                  {errorMessage}
                </p>
              )}
            </div>

            {/* Consent Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer transition-smooth">
                <input
                  type="checkbox"
                  checked={hasConsented}
                  onChange={(e) => {
                    setHasConsented(e.target.checked);
                    setErrorMessage('');
                    setSubmitStatus('idle');
                  }}
                  className="mt-1 w-5 h-5 md:w-4 md:h-4 rounded-soft transition-smooth cursor-pointer flex-shrink-0"
                  style={{
                    accentColor: 'var(--accent)',
                  }}
                  required
                  disabled={isSubmitting}
                />
                <span className="text-xs transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                  I agree to receive email notifications about premium features and understand that my email will be stored with Resend. I can unsubscribe at any time. By joining, I acknowledge that I have read and agree to the{' '}
                  <a 
                    href="/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline transition-smooth hover:opacity-80"
                    style={{ color: 'var(--accent)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !hasConsented}
              className="w-full px-5 py-3 text-sm font-medium rounded-soft transition-smooth flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
              }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Joining...
                </>
              ) : (
                'Join Waitlist'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
