import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/layout/Navbar";
import { CartNavbar } from './components/CartNavbar';
import Footer from './components/layout/Footer';
import { Providers } from './providers/Providers';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pathology Listing | Find Labs Near You",
  description: "Discover the best pathology labs near you with reviews, ratings, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pb-24">
              {children}
            </main>
            <CartNavbar />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
