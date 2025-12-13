import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#10A37F',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: '16px',
        }}
      >
        {/* Share symbol: Two connected circles with arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Left circle (source) */}
          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '80px',
              color: '#10A37F',
              fontWeight: 'bold',
            }}
          >
            A
          </div>
          {/* Arrow pointing right */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '8px',
                background: 'white',
              }}
            />
            <div
              style={{
                width: '0',
                height: '0',
                borderLeft: '24px solid white',
                borderTop: '16px solid transparent',
                borderBottom: '16px solid transparent',
              }}
            />
          </div>
          {/* Right circle (destination) */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'white',
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
