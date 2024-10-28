import { IconBellRinging } from "@tabler/icons-react";
import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus
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
    subheader: "Utilities"
  },
  {
    id: uniqueId(),
    title: "Typography",
    icon: IconTypography,
    href: "/utilities/typography"
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow"
  },
  {
    navlabel: true,
    subheader: "Auth"
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login"
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register"
  },
  {
    navlabel: true,
    subheader: "Extra"
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons"
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page"
  }
];

export default Menuitems;
