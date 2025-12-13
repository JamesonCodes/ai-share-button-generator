import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
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
          borderRadius: '20%',
          position: 'relative',
        }}
      >
        {/* Share symbol: Two connected circles with arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Left circle (source) */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
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
                width: '20px',
                height: '3px',
                background: 'white',
              }}
            />
            <div
              style={{
                width: '0',
                height: '0',
                borderLeft: '8px solid white',
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
              }}
            />
          </div>
          {/* Right circle (destination) */}
          <div
            style={{
              width: '42px',
              height: '42px',
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
