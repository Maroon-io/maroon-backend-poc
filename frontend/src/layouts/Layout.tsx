import { Main } from "grommet";
import React from "react";

import { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import colors from "../constants/colors";

import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/reducers";
import { DashboardTopBar } from "../components";

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, openNotifications } = useSelector((state: any) => {
    const { theme, openNotifications } = state.webAppReducer;
    return { theme, openNotifications };
  }, shallowEqual);

  const dispatch = useDispatch();

  // defaults to device theme
  // useEffect(() => {
  //   if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
  //     dispatch(setTheme("dark"));
  //   } else {
  //     dispatch(setTheme("light"));
  //   }
  // }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  return (
    <SkeletonTheme
      baseColor={theme === "dark" ? "#1E0C1B" : colors.tertiary}
      highlightColor={theme === "dark" ? colors.grayLight : colors.gray}
    >
      <Main className="dark:bg-dark">
        <DashboardTopBar switchTheme={handleThemeSwitch} theme={theme} />
        {children}
      </Main>
    </SkeletonTheme>
  );
};

export default Layout;
