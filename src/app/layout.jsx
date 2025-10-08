import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AppProviders } from './providers';

export const metadata = {
  title: 'HRSync Dashboard',
  description: 'Employee details and schedule management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
