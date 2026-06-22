import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinTrack — Dead-simple finance for iPhone",
  description:
    "Track expenses, income, and loans on iPhone. Offline-first, with secure cloud sync.",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  metadataBase: new URL("https://fintrack.app"),
  openGraph: {
    title: "FinTrack — Dead-simple finance for iPhone",
    description:
      "Track expenses, income, and loans on iPhone. Offline-first, with secure cloud sync.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
