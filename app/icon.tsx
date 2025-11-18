import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Use the Polkasmesh logo as favicon
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FF0080 0%, #E6007A 100%)',
          borderRadius: '50%',
        }}
      >
        {/* Polkadot mesh network icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {/* Center node */}
          <circle cx="12" cy="12" r="2" fill="white" />
          
          {/* Surrounding nodes */}
          <circle cx="6" cy="6" r="1.5" fill="white" opacity="0.9" />
          <circle cx="18" cy="6" r="1.5" fill="white" opacity="0.9" />
          <circle cx="6" cy="18" r="1.5" fill="white" opacity="0.9" />
          <circle cx="18" cy="18" r="1.5" fill="white" opacity="0.9" />
          
          {/* Connection lines */}
          <line x1="6" y1="6" x2="12" y2="12" stroke="white" strokeWidth="0.5" opacity="0.6" />
          <line x1="18" y1="6" x2="12" y2="12" stroke="white" strokeWidth="0.5" opacity="0.6" />
          <line x1="6" y1="18" x2="12" y2="12" stroke="white" strokeWidth="0.5" opacity="0.6" />
          <line x1="18" y1="18" x2="12" y2="12" stroke="white" strokeWidth="0.5" opacity="0.6" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
