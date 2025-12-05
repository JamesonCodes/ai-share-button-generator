'use client';

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
}

interface PremiumFeaturesProps {
  onFeatureClick: (feature: PremiumFeature) => void;
}

const premiumFeatures: PremiumFeature[] = [
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    description: 'Track clicks, performance, and user engagement',
  },
  {
    id: 'custom-themes',
    name: 'Custom Themes',
    description: 'Branded button styles and color customization',
  },
  {
    id: 'white-label',
    name: 'White Label',
    description: 'Remove attribution and add custom branding',
  },
];

export default function PremiumFeatures({ onFeatureClick }: PremiumFeaturesProps) {
  return (
    <div className="mt-8 pt-8 border-t transition-smooth" style={{ borderColor: 'var(--border)' }}>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2 transition-smooth" style={{ color: 'var(--text-primary)' }}>
          Premium Features
        </h3>
        <p className="text-sm transition-smooth" style={{ color: 'var(--text-secondary)' }}>
          Unlock advanced features to enhance your share buttons
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {premiumFeatures.map((feature) => (
          <button
            key={feature.id}
            type="button"
            onClick={() => onFeatureClick(feature)}
            className="relative p-4 rounded-soft transition-smooth text-left border group hover:opacity-90"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-start gap-3">
              {/* Lock Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 transition-smooth"
                  style={{ color: 'var(--text-secondary)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium transition-smooth" style={{ color: 'var(--text-primary)' }}>
                    {feature.name}
                  </h4>
                  <span
                    className="px-2 py-0.5 text-xs font-medium rounded-full transition-smooth"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#FFFFFF',
                    }}
                  >
                    Premium
                  </span>
                </div>
                <p className="text-xs transition-smooth" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
              
              {/* Arrow Icon */}
              <div className="flex-shrink-0">
                <svg
                  className="w-4 h-4 transition-smooth group-hover:translate-x-1"
                  style={{ color: 'var(--text-secondary)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
