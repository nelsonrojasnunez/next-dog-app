import type { Metadata } from "next";
import "bulma/css/bulma.min.css";

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
      <body>
        <section className="section">
          <div className="container">{children}</div>
        </section>
      </body>
    </html>
  );
}
