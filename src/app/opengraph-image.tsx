import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Barun Prasad — Engineering Leader & Frontend Architect';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  // next/og (Satori) reads TTF/OTF, not woff2 — use the .ttf weights.
  const fontsDir = join(process.cwd(), 'src/fonts/general-sans');
  const [bold, medium] = await Promise.all([
    readFile(join(fontsDir, 'GeneralSans-Bold.ttf')),
    readFile(join(fontsDir, 'GeneralSans-Medium.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '90px',
          backgroundColor: '#0a0a0b',
          fontFamily: 'General Sans',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -220,
            left: -160,
            width: 760,
            height: 760,
            background:
              'radial-gradient(circle, rgba(200,255,0,0.18), rgba(10,10,11,0) 70%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 99,
              backgroundColor: '#c8ff00',
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#8a8a8e',
              textTransform: 'uppercase',
              letterSpacing: 8,
            }}
          >
            Engineering Leader
          </div>
        </div>
        <div
          style={{
            fontSize: 150,
            fontWeight: 700,
            color: '#ededed',
            marginTop: 28,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          Barun Prasad
        </div>
        <div style={{ fontSize: 34, fontWeight: 500, color: '#8a8a8e', marginTop: 34 }}>
          Strategic leadership · Design systems · AI-assisted delivery
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'General Sans', data: bold, weight: 700, style: 'normal' },
        { name: 'General Sans', data: medium, weight: 500, style: 'normal' },
      ],
    },
  );
}
