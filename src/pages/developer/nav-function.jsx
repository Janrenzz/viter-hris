import { FaCogs, FaUsers } from "react-icons/fa";
import { devNavUrl, urlDeveloper } from "../../functions/functions-general";
import { MdDashboard } from "react-icons/md";

export const navList = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    menu: "dashboard",
    path: `${devNavUrl}/${urlDeveloper}/dashboard`,
    submenu: "",
  },
  {
    label: "Employees",
    icon: <FaUsers />,
    menu: "employees",
    path: `${devNavUrl}/${urlDeveloper}/employees`,
    submenu: "",
  },
  {
    label: "Settings",
    icon: <FaCogs />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        path: `${devNavUrl}/settings/roles`,
        label: "Role",
      },
      {
        path: `${devNavUrl}/settings/users`,
        label: "Users",
      },
    ],
  },
];
