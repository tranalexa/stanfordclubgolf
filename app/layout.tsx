import type { Metadata } from "next";
import { Chicle, DM_Sans, Fredoka } from "next/font/google";
import "./globals.css";
import PillNav from "@/components/PillNav";
import { site } from "@/content/site";

const display = Chicle({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const heading = Fredoka({
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.name,
    description: site.tagline,
    siteName: site.name,
    type: "website",
    images: [{ url: "/images/hero-home.jpg" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PillNav />
        {children}
      </body>
    </html>
  );
}
