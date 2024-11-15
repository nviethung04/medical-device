import {
  IconBellRinging,
  IconUserCog,
  IconUsers,
  IconBox,
  IconDownload,
  IconUpload,
  IconDashboard,
  IconSettingsAutomation
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Tổng quan"
  },
  {
    id: uniqueId(),
    title: "Bảng điều khiển",
    icon: IconDashboard,
    href: "/"
  },
  {
    id: uniqueId(),
    title: "Thông báo",
    icon: IconBellRinging,
    href: "/notifications"
  },
  {
    id: uniqueId(),
    title: "Lịch trình bảo trì",
    icon: IconSettingsAutomation,
    href: "/maintenances"
  },
  {
    navlabel: true,
    subheader: "Quản lý Nhập/Xuất"
  },
  {
    id: uniqueId(),
    title: "Xuất hàng",
    icon: IconUpload,
    href: "/orders/exports"
  },
  {
    id: uniqueId(),
    title: "Nhập hàng",
    icon: IconDownload,
    href: "/orders/imports"
  },
  {
    id: uniqueId(),
    title: "Danh sách đơn hàng",
    icon: IconBox,
    href: "/orders"
  },
  {
    navlabel: true,
    subheader: "Quản lý kho hàng"
  },
  {
    id: uniqueId(),
    title: "Danh sách sản phẩm",
    icon: IconBox,
    href: "/products"
  },
  {
    id: uniqueId(),
    title: "Thêm sản phẩm",
    icon: IconDownload,
    href: "/products/create"
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
  }
];

export default Menuitems;
