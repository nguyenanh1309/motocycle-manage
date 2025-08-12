import React from "react";

type Props = {
  name: string;
  className?: string;
  textSize?: string;
};

const AvatarCanvas = ({
  name,
  className = "w-full h-full",
  textSize = "text-[14px]",
}: Props) => {
  const getInitials = (name: string): string => {
    const names = name.split(" ");
    const firstInitial = names[0]?.[0]?.toUpperCase() || "";
    const lastInitial = names.length > 1 ? names[names.length - 1][0]?.toUpperCase() || "" : "";
    return firstInitial + lastInitial;
  };
  
  const initials = getInitials(name);

  // Chọn màu sắc dựa trên mã ASCII của ký tự đầu tiên của từ viết tắt
  const pickColor = (abbrev: string): string => {
    let sum = 0;
    for (let i = 0; i < abbrev.length; i++) {
      sum += abbrev.charCodeAt(i);
    }
    const colors = [
      "#FADDD8",
      "#E6E6E6",
      "#D9EAD3",
      "#E5E0F4",
      "#E2F0CB",
      "#FFE5CC",
      "#D5E9F3",
      "#F6CED8",
    ];
    return colors[sum % colors.length];
  };
  const randomColor = pickColor(initials);

  return (
    <div
      className={`flex items-center justify-center ${className} rounded-full`}
      style={{ backgroundColor: randomColor }}
    >
      <span className={`${textSize} font-semibold`}>{initials}</span>
    </div>
  );
};

export default AvatarCanvas;
