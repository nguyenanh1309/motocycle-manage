import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar/>
      <div className="w-full h-full">
        <Header />
        <div className="h-[calc(100vh-120px)] bg-[#F3F3F3]">
          {children}
        </div>
      </div>
    </div>
  );
}
