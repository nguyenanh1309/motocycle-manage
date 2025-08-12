"use client"
import Image from "next/image";
import React from "react";
import NavItem from "../bases/NavItem";
import { FaPenSquare } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiMockserviceworker } from "react-icons/si";
import { IoIosListBox } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { MdInventory2 } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useRouter } from "next/navigation";



const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  }

  return (
    <div className="relative max-w-[255px] w-full h-full border-r">
      <div className="h-[70px] flex items-center justify-center">
        <div>
          <Image src="/logo-moto.png" alt="motocly" width={160} height={26} />
        </div>
      </div>
      <div className="flex flex-col">
        <NavItem label="Tổng quan" href="/dashboard" >
          <RiDashboardHorizontalFill />
        </NavItem>
        <NavItem label="Hóa đơn" href="/invoices" >
          <FaPenSquare />
        </NavItem>
        <NavItem label="Dịch vụ" href="/services" >
          <SiMockserviceworker />
        </NavItem>
        <NavItem label="Phiếu chi" href="/expenses" >
          <IoIosListBox />
        </NavItem>
        <NavItem label="Nhân viên" href="/staff" >
          <FaUserGroup />
        </NavItem>
        <NavItem label="Kho hàng" href="/inventory" >
          <MdInventory2 />
        </NavItem>
        <NavItem label="Cổ phần" href="/shares" >
          <RiDiscountPercentFill/>
        </NavItem>
        <NavItem label="Báo cáo" href="/reports" >
          <BiSolidReport/>
        </NavItem>
        <NavItem label="Tài khoản" href="/accounts" >
          <MdManageAccounts/>
        </NavItem>
        <NavItem label="Cấu hình" href="/settings" >
          <IoMdSettings/>
        </NavItem>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center px-5 py-2">
        <button onClick={handleLogout} className="flex items-center gap-2 h-[60px] w-full border-t">
          <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#2BA563] text-[#ffffff] rounded-full">
            <IoLogOut />
          </div>
          <span className="text-[#5B5B5B]">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
