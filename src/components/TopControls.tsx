'use client';

import ThemeToggle from '@/components/ThemeToggle';
import StrategicAdvantageButton from '@/components/StrategicAdvantageButton';
import FeedbackButton from '@/components/FeedbackButton';

export default function TopControls() {
  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex flex-col items-end gap-3">
      <ThemeToggle />
      <StrategicAdvantageButton />
      <FeedbackButton />
    </div>
  );
}
