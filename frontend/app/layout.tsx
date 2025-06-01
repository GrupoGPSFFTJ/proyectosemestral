import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import { NavBar } from '@/components/NavBar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema Clínico',
  description: 'Aplicación de Registro Clínico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head />
      <body>
        <AuthProvider>
          <AuthGate>
            <NavBar />
            <main style={{ padding: '1rem', marginTop: '4rem' }}>
              {children}
            </main>
          </AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}