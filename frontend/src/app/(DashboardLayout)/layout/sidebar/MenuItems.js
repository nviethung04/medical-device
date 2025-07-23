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

const Menuitems = [
  {
    id: "subheader-overview",
    type: "subheader",
    subheader: "Tổng quan"
  },
  {
    id: "dashboard",
    title: "Bảng điều khiển",
    icon: <IconDashboard />,
    href: "/"
  },
  {
    id: "notifications",
    title: "Thông báo",
    icon: <IconBellRinging />,
    href: "/notifications"
  },
  {
    id: "maintenances",
    title: "Lịch trình bảo trì",
    icon: <IconSettingsAutomation />,
    href: "/maintenances"
  },
  {
    id: "subheader-import-export",
    type: "subheader",
    subheader: "Quản lý Nhập/Xuất"
  },
  {
    id: "orders-exports",
    title: "Xuất hàng",
    icon: <IconUpload />,
    href: "/orders/exports"
  },
  {
    id: "orders-imports",
    title: "Nhập hàng",
    icon: <IconDownload />,
    href: "/orders/imports"
  },
  {
    id: "orders",
    title: "Danh sách đơn hàng",
    icon: <IconBox />,
    href: "/orders"
  },
  {
    id: "subheader-inventory",
    type: "subheader",
    subheader: "Quản lý kho hàng"
  },
  {
    id: "products",
    title: "Danh sách sản phẩm",
    icon: <IconBox />,
    href: "/products"
  },
  {
    id: "products-create",
    title: "Thêm sản phẩm",
    icon: <IconDownload />,
    href: "/products/create"
  },
  {
    id: "subheader-accounts",
    type: "subheader",
    subheader: "Quản lý tài khoản"
  },
  {
    id: "users",
    title: "Người dùng",
    icon: <IconUserCog />,
    href: "/account/users"
  },
  {
    id: "customers",
    title: "Khách hàng",
    icon: <IconUsers />,
    href: "/account/customers"
  }
];

export default Menuitems;
