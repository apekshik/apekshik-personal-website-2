import type { Metadata } from "next";
import { Inter, Bebas_Neue, Abril_Fatface } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-bebas-neue",
});

const abrilFatFace = Abril_Fatface({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-abril-fatface",
});

export const metadata: Metadata = {
  title: "Apekshik Panigrahi",
  description: "Front Page of Apekshik's Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${abrilFatFace.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
