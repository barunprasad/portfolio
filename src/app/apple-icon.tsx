import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const font = await readFile(
    join(process.cwd(), 'src/fonts/general-sans/GeneralSans-Bold.ttf'),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#c8ff00',
          color: '#0a0a0b',
          fontFamily: 'General Sans',
          fontWeight: 700,
          fontSize: 112,
        }}
      >
        B
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'General Sans', data: font, weight: 700, style: 'normal' },
      ],
    },
  );
}
