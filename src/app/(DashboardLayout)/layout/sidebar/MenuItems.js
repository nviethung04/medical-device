import { IconBellRinging, IconUserCog } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
import { IconAperture, IconCopy, IconLayoutDashboard } from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Tổng quan"
  },

  {
    id: uniqueId(),
    title: "Bảng điều khiển",
    icon: IconLayoutDashboard,
    href: "/"
  },
  {
    id: uniqueId(),
    title: "Thông báo",
    icon: IconBellRinging,
    href: "/notifications"
  },
  {
    navlabel: true,
    subheader: "Quản lý tài khoản"
  },
  {
    id: uniqueId(),
    title: "Người dùng",
    icon: IconUserCog,
    href: "/account/users"
  },
  {
    id: uniqueId(),
    title: "Khách hàng",
    icon: IconUsers,
    href: "/account/customers"
  },
  {
    navlabel: true,
    subheader: "Sản phẩm"
  },
  {
    id: uniqueId(),
    title: "Danh sách sản phẩm",
    icon: IconAperture,
    href: "/products"
  },
  {
    id: uniqueId(),
    title: "Thêm sản phẩm",
    icon: IconCopy,
    href: "/products/create"
  },
  {
    id: uniqueId(),
    title: "Quản lý Nhập/Xuất",
    icon: IconCopy,
    href: "/products/inventory"
  }
];

export default Menuitems;
