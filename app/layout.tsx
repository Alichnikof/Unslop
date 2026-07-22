import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Project",
  description: "Built with Unslop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
