'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface FeedbackFormProps {
  onSubmitSuccess?: () => void;
}

export default function FeedbackForm({ onSubmitSuccess }: FeedbackFormProps) {
  const { theme } = useTheme();
  const [email, setEmail] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !email.trim()) {
      setEmailError('Email is required');
      setSubmitStatus({
        type: 'error',
        message: 'Please enter your email address',
      });
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address');
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    if (!rating) {
      setSubmitStatus({
        type: 'error',
        message: 'Please select a rating',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    setEmailError('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          rating,
          message: message.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit feedback');
      }

      // Success
      setSubmitStatus({
        type: 'success',
        message: data.message || 'Thank you for your feedback!',
      });

      // Reset form
      setEmail('');
      setRating('');
      setMessage('');

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseStyles = "w-full px-4 py-3.5 md:py-3 rounded-soft transition-smooth font-normal";
  const inputFocusStyles = "focus:outline-none focus:border-accent";

  const ratingOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Email <span style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          className={`${inputBaseStyles} ${inputFocusStyles}`}
          style={{
            backgroundColor: 'var(--background)',
            border: `1px solid ${emailError ? 'var(--accent)' : 'var(--border)'}`,
            color: 'var(--text-primary)',
          }}
          placeholder="your.email@example.com"
          required
          maxLength={255}
        />
        {emailError && (
          <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--accent)' }}>
            {emailError}
          </p>
        )}
      </div>

      {/* Rating Question */}
      <div>
        <label className="block text-sm font-medium mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          On a scale of 1–5, how easy was it to generate and embed the AI share button?{' '}
          <span style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <div className="flex gap-3 flex-wrap">
          {ratingOptions.map((option) => {
            const isSelected = rating === option.value;
            return (
              <label
                key={option.value}
                className={`relative inline-flex items-center justify-center w-12 h-12 rounded-soft cursor-pointer transition-smooth ${
                  isSelected ? '' : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isSelected
                    ? theme === 'dark'
                      ? 'rgba(25, 195, 125, 0.15)'
                      : 'rgba(16, 163, 127, 0.15)'
                    : 'transparent',
                  border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                <input
                  type="radio"
                  name="rating"
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => setRating(e.target.value)}
                  className="sr-only"
                  required
                />
                <span
                  className="text-base font-medium transition-smooth"
                  style={{
                    color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                  }}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--text-secondary)' }}>
          1 = Very difficult, 5 = Very easy
        </p>
      </div>

      {/* Feedback Message */}
      <div>
        <label className="block text-sm font-medium mb-2.5 md:mb-3 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          What feature or improvement would make AI Share Button Generator more valuable for you?
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className={`${inputBaseStyles} ${inputFocusStyles} resize-none`}
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          placeholder="Share your thoughts, suggestions, or ideas..."
          maxLength={2000}
        />
        <p className="mt-2 text-xs transition-smooth" style={{ color: 'var(--text-secondary)' }}>
          {message.length}/2000 characters
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting || !rating || !email}
          className="w-full px-6 py-3.5 md:py-3 rounded-soft font-medium transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: isSubmitting || !rating || !email ? 'var(--border)' : 'var(--accent)',
            color: '#FFFFFF',
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>

      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`rounded-soft p-4 transition-smooth ${
            submitStatus.type === 'success' ? 'border' : 'border'
          }`}
          style={{
            backgroundColor: submitStatus.type === 'success'
              ? theme === 'dark'
                ? 'rgba(25, 195, 125, 0.1)'
                : 'rgba(16, 163, 127, 0.1)'
              : theme === 'dark'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(239, 68, 68, 0.1)',
            borderColor: submitStatus.type === 'success' ? 'var(--accent)' : '#EF4444',
          }}
        >
          <p
            className="text-sm transition-smooth"
            style={{
              color: submitStatus.type === 'success' ? 'var(--accent)' : '#EF4444',
            }}
          >
            {submitStatus.message}
          </p>
        </div>
      )}
    </form>
  );
}
