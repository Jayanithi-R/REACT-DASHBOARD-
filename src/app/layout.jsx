import { Inter } from 'next/font/google';
import './globals.css';
import { SearchProvider } from '@/context/SearchContext';
import { Sidebar } from '@/components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HRsync',
  description: 'HR Management Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <SearchProvider>
          <div className="flex">
            <Sidebar />
            {children}
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
