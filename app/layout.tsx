import type { Metadata } from 'next';
import './globals.css';
import { QuizProvider } from '@/lib/quiz-store';
import { siteConfig } from '@/config/site';
import { getThemeTokens, themeVarsToStyle } from '@/config/themes';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = siteConfig.theme.default;
  const tokens = getThemeTokens(theme);
  const styleStr = themeVarsToStyle(tokens.vars);

  return (
    <html lang="en" style={{ cssText: styleStr } as React.CSSProperties}>
      <body className={tokens.bodyClass}>
        <QuizProvider>
          <div className="bg-blob bg-blob-1" aria-hidden="true" />
          <div className="bg-blob bg-blob-2" aria-hidden="true" />
          <div className="relative z-10 flex flex-col min-h-dvh">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </QuizProvider>
      </body>
    </html>
  );
}
