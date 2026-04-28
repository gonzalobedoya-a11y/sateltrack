import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPS SATELTRACK — Centro de Monitoreo Satelital",
  description: "Sistema profesional de rastreo GPS y monitoreo de flotas",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
