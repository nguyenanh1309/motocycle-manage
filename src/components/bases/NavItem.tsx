import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


type Props = {
  label: string;
  href: string;
  children?: React.ReactNode;
};

const NavItem = ({ label, href, children }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <div className="pr-5">
      <Link href={href}>
          <div className={`h-[50px] flex items-center px-5 ${isActive ? "bg-[#2BA563] text-[#FFFFFF]" : "text-[#A2B5A0] hover:bg-[#f0f0f0] hover:text-[#A2B5A0] hover:cursor-pointer"} rounded-tr-full rounded-br-full`}>
            <div className="px-2">
              {children}
            </div>
            <div className="heading-4">{label}</div>
          </div>
      </Link>
      
    </div>
  );
};

export default NavItem;
