import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Head from 'next/head';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LinkUp',
  description: 'Advanced productivity and task management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/public/favicon.png" type="image/x-icon" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}