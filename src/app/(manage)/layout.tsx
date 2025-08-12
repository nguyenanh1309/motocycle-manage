import DefaultLayout from "@/components/layouts/DefaultLayout";
import Provider from "@/redux/Provider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | ThanhCong",
  description: "Quản lý nội dung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <DefaultLayout>{children}</DefaultLayout>
    </Provider>
  );
}
