import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chào em",
  description: "Happy valentine nha pé",
  openGraph: {
    title: "Chào em",
    description: "Happy valentine nha pé",
    url: "https://vlt25.wilsonle.me", // Replace with your actual website URL
    siteName: "Happy valentine nha pé",
    images: [
      {
        url: "https://vlt25.wilsonle.me/_next/image?url=%2Fvlt5.JPG&w=1920&q=75", // Replace with an actual image URL
        width: 1200,
        height: 630,
        alt: "Chào em - Happy valentine nha pé",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
