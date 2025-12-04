import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Share Button Generator",
  description: "Generate embeddable AI share buttons for your blog or website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

