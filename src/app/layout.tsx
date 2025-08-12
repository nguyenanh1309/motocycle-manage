import GGAuthProvider from "@/components/common/GGAuthProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <GGAuthProvider>{children}</GGAuthProvider>
      </body>
    </html>
  );
}
