import type { Metadata } from "next";
import "@picocss/pico";

export const metadata: Metadata = {
  title: "Next Dog App",
  description: "See lovely dogs pictures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="color-scheme" content="light dark" />
      <body className="container">{children}</body>
    </html>
  );
}
