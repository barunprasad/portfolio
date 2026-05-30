import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Branded favicon — dark "B" on the lime accent (matches the site identity).
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default async function Icon() {
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
          fontSize: 320,
          borderRadius: 112,
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
