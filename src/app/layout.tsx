import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/ui/header"

export const metadata: Metadata = {
  title: "LiftQuest",
  description: "LiftQuest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
