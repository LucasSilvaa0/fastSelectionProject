import "./globals.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
