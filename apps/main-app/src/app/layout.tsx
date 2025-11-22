import './global.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AuthProvider } from '../providers/AuthProvider';
import { QueryProvider } from '../providers/QueryProvider';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'The Bazaar - Your Marketplace. Your Rules.',
  description: 'Connecting Kenyan vendors to global shoppers. Discover unique products from trusted vendors.',
  keywords: 'marketplace, e-commerce, Kenya, shopping, vendors, products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <QueryProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
