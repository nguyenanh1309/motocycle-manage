"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  AvatarGroup,
  CircularProgress,
} from "@mui/material";

const branches = [
  {
    name: "Thành Thăng Moto",
    address: "108 Tôn Thất Tùng, Đống Đa, Hà Nội",
    progress: 80,
    color: "primary",
    members: ["EJ", "AI", "RJ", "R"],
    more: 2,
  },
  {
    name: "Thành Công Moto",
    address: "122 Vũ Trọng Phụng, Thanh Xuân, Hà Nội",
    progress: 85,
    color: "secondary",
    members: ["RE", "JI", "PD"],
  },
  {
    name: "Vân Động Moto",
    address: "120 Tây Mỗ, Nam Từ Liêm, Hà Nội",
    progress: 70,
    color: "success",
    members: ["EJ", "AF"],
  },
];

export default function BranchList() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            Danh Sách Cơ Sở
          </Typography>
          <Button variant="text" size="small">
            View All
          </Button>
        </Box>

        {/* Danh sách */}
        {branches.map((branch, i) => (
          <Box
            key={i}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            mb={1}
            borderRadius={2}
            border="1px solid #e0e0e0"
          >
            {/* Progress hình tròn */}
            <Box position="relative" display="inline-flex" mr={2}>
              <CircularProgress
                variant="determinate"
                value={branch.progress}
                size={50}
                thickness={5}
                color={branch.color as any}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption" fontWeight="bold">
                  {branch.progress}%
                </Typography>
              </Box>
            </Box>

            {/* Tên + địa chỉ */}
            <Box flex={1} ml={1}>
              <Typography fontWeight="bold">{branch.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {branch.address}
              </Typography>
            </Box>

            {/* Nhóm avatar */}
            <AvatarGroup max={4} sx={{ mr: 2 }}>
              {branch.members.map((m, idx) => (
                <Avatar key={idx}>{m}</Avatar>
              ))}
              {branch.more && <Avatar>+{branch.more}</Avatar>}
            </AvatarGroup>

            {/* Nút detail */}
            <Button variant="contained" color="success" size="small">
              View detail
            </Button>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
