import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteMetadata } from './siteMetadata';
import { inter, generalSans, GeistMono } from './fonts';

export const metadata: Metadata = { ...siteMetadata };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${generalSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Flag JS as early as possible so reveal-hiding CSS applies pre-paint
            (no flash of hidden→shown). No-JS users never get the hiding rules. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
