import React from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../store/StoreContext";
import { MdDashboard, MdTimer } from "react-icons/md";
import {
  FaUsers,
  FaClipboardCheck,
  FaBusinessTime,
  FaCalendarAlt,
  FaNewspaper,
  FaCog,
  FaBook,
} from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { PiCaretDown } from "react-icons/pi";
import { HiSpeakerphone } from "react-icons/hi";
import { GiPayMoney } from "react-icons/gi";

const Navigation = ({ navigationList = [], menu = "", submenu = "" }) => {
  const context = React.useContext(StoreContext);
  const store = context?.store ?? {
    isShow: true,
    isLeaveOpen: false,
    isKpiOpen: false,
    isPayrollOpen: false,
    isSettingsOpen: true,
  };
  const dispatch = context?.dispatch ?? (() => {});

  const scrollRef = React.useRef(null);
  const link = "/developer";
  const isMobileOrTablet = window.matchMedia("(max-width:1027px)").matches;

  const handleShowNavigation = () => {};
  const handleScroll = () => {};

  const handleLeaveOpen = () => {};
  const handleKpiOpen = () => {};
  const handlePayrollOpen = () => {};
  const handleSettingsOpen = () => {};

  const setIsSearch = () => ({ type: "noop" });

  return (
    <div className="print:hidden">
      <nav
        className={`${
          store.isShow ? "translate-x-0" : "-translate-x-56"
        } duration-200 ease-in fixed z-40 overflow-y-auto w-[14rem] print:hidden py-3 uppercase pt-[76px]`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div className="flex h-full flex-col justify-between text-sm text-white">
          <ul>
            <li
              className={`${
                menu === "overview" ? "active" : "hover:bg-secondary/30"
              } mb-2 pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/overview`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="overview"
              >
                <MdDashboard className="mr-4 h-4 w-4" />
                <span>Overview</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "time" ? "active" : "hover:bg-secondary/30"
              } mb-2 pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/time`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="Time"
              >
                <MdTimer className="mr-4 h-4 w-4" />
                <span>Time</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "task" ? "active" : "hover:bg-secondary/30"
              } mb-2 pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/task`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="Task"
              >
                <FaClipboardCheck className="mr-4 h-4 w-4" />
                <span>Task</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "leave" ? "active" : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-3`}
              onClick={handleLeaveOpen}
            >
              <div
                className="w-full flex items-center justify-between px-2 py-1 tooltip-navigation"
                data-tooltip="Leave"
              >
                <BsFillCalendarEventFill className="mr-4 h-4 w-4" />
                <div className="flex w-full items-center justify-between">
                  <span className="ml-0.5">Leave</span>
                  <PiCaretDown
                    className={`mr-2 ${
                      !store.isLeaveOpen
                        ? "rotate-0 duration-200"
                        : "rotate-180 duration-200"
                    }`}
                  />
                </div>
              </div>
            </li>

            <li
              className={`${
                menu === "overtime" ? "active" : "hover:bg-secondary/30"
              } mb-2 pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/overtime`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="overtime"
              >
                <FaBusinessTime className="mr-4 h-4 w-4" />
                <span>Overtime</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "employees" ? "active" : "hover:bg-secondary/30"
              } mb-2 pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/employees`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="Employees"
              >
                <FaUsers className="mr-4 h-4 w-4" />
                <span>Employees</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "work-from-home" ? "active" : "hover:bg-secondary/30"
              } mb-2 pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/work-from-home`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="work from home"
              >
                <FaUsers className="mr-4 h-4 w-4" />
                <span>Work From Home</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "subscriber-client"
                  ? "active"
                  : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/subscriber-client`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="Client"
              >
                <FaBuildingUser className="mr-4 h-4 w-4" />
                <span>Client</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "announcement" ? "active" : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/announcement`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="Announcement"
              >
                <HiSpeakerphone className="mr-4 h-4 w-4" />
                <span>Announcement</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "calendar-rd-leave" ? "active" : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/calendar-rd-leave`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="Calendar Rest Day and Leave"
              >
                <FaCalendarAlt className="mr-4 h-4 w-4" />
                <span>Calendar RD & L</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "work-schedule" ? "active" : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-3`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/work-schedule`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="Work Schedule"
              >
                <FaBuildingUser className="mr-4 h-4 w-4" />
                <span>Work Schedule</span>
              </Link>
            </li>

            <li
              className={`${
                menu === "kpi" ? "active" : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-3`}
              onClick={handleKpiOpen}
            >
              <div
                className="w-full flex items-center justify-between px-2 py-1 tooltip-navigation"
                data-tooltip="kpi"
              >
                <FaNewspaper className="mr-4 h-4 w-4" />
                <div className="flex w-full items-center justify-between">
                  <span className="ml-0.5">KPI</span>
                  <PiCaretDown
                    className={`mr-2 ${
                      !store.isKpiOpen
                        ? "rotate-0 duration-200"
                        : "rotate-180 duration-200"
                    }`}
                  />
                </div>
              </div>
            </li>

            <li
              className={`${
                menu === "payroll" ? "active" : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-3`}
              onClick={handlePayrollOpen}
            >
              <div
                className="w-full flex items-center justify-between px-2 py-1 tooltip-navigation"
                data-tooltip="Payroll"
              >
                <GiPayMoney className="mr-4 h-4 w-4" />
                <div className="flex w-full items-center justify-between">
                  <span className="ml-0.5">Payroll</span>
                  <PiCaretDown
                    className={`mr-2 ${
                      !store.isPayrollOpen
                        ? "rotate-0 duration-200"
                        : "rotate-180 duration-200"
                    }`}
                  />
                </div>
              </div>
            </li>

            <li
              className={`${
                menu === "settings" ? "active" : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-3`}
              onClick={handleSettingsOpen}
            >
              <div
                className="w-full flex items-center justify-between px-2 py-1 tooltip-navigation"
                data-tooltip="Settings"
              >
                <FaCog className="mr-4 h-4 w-4" />
                <div className="flex w-full items-center justify-between">
                  <span className="ml-0.5">Settings</span>
                  <PiCaretDown
                    className={`mr-2 ${
                      !store.isSettingsOpen
                        ? "rotate-0 duration-200"
                        : "rotate-180 duration-200"
                    }`}
                  />
                </div>
              </div>
            </li>

            {store.isSettingsOpen && (
              <ul className="mb-2 ml-12 text-xs capitalize">
                <li>
                  <Link
                    className={`${
                      submenu === "users"
                        ? "submenu-active"
                        : "w-full flex items-center justify-start tooltip-navigation"
                    } w-full h-full rounded-r-md border-transparent px-1 my-0.5 mb-2 border-l-2 duration-150 hover:!border-white`}
                    to={`${link}/settings/users`}
                    onClick={handleShowNavigation}
                  >
                    <span>Users</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className={`${
                      submenu === "subscriber"
                        ? "submenu-active"
                        : "w-full flex items-center justify-start tooltip-navigation"
                    } w-full h-full rounded-r-md border-transparent px-1 my-0.5 mb-2 border-l-2 duration-150 hover:!border-white`}
                    to={`${link}/settings/subscriber`}
                    onClick={handleShowNavigation}
                  >
                    <span>Subscribers</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className={`${
                      submenu === "job"
                        ? "submenu-active"
                        : "w-full flex items-center justify-start tooltip-navigation"
                    } w-full h-full rounded-r-md border-transparent px-1 my-0.5 mb-2 border-l-2 duration-150 hover:!border-white`}
                    to={`${link}/settings/job`}
                    onClick={handleShowNavigation}
                  >
                    <span>Job</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className={`${
                      submenu === "department"
                        ? "submenu-active"
                        : "w-full flex items-center justify-start tooltip-navigation"
                    } w-full h-full rounded-r-md border-transparent px-1 my-0.5 mb-2 border-l-2 duration-150 hover:!border-white`}
                    to={`${link}/settings/department`}
                    onClick={handleShowNavigation}
                  >
                    <span>Department</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className={`${
                      submenu === "roles"
                        ? "submenu-active"
                        : "w-full flex items-center justify-start tooltip-navigation"
                    } w-full h-full rounded-r-md border-transparent px-1 my-0.5 mb-2 border-l-2 duration-150 hover:!border-white`}
                    to={`${link}/settings/roles`}
                    onClick={handleShowNavigation}
                  >
                    <span>Roles</span>
                  </Link>
                </li>
              </ul>
            )}

            <li
              className={`${
                menu === "user-manual" ? "active" : "hover:bg-secondary/30"
              } mb-2 cursor-pointer pl-2.5`}
              onClick={() => dispatch(setIsSearch(false))}
            >
              <Link
                to={`${link}/user-manual`}
                className="w-full flex items-center justify-start px-2 py-1 tooltip-navigation"
                onClick={handleShowNavigation}
                data-tooltip="user-manual"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FaBook className="mr-4 h-4 w-4" />
                <span>User Manual</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <span
        className={`${
          store.isShow ? "" : "-translate-x-full"
        } fixed z-30 h-screen w-screen bg-dark/50 ${
          isMobileOrTablet ? "" : "lg:hidden"
        }`}
        onClick={handleShowNavigation}
        onTouchMove={handleShowNavigation}
      ></span>
    </div>
  );
};

export default Navigation;