"use client";

import { useTheme } from "next-themes";
import {
  faSun,
  faMoon,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function DarkModeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const icon = {
    light: faSun,
    dark: faMoon,
    system: faCircleHalfStroke,
  }[theme];

  const cycleTheme = () => {
    const modes = ["system", "light", "dark"];
    const currentIndex = modes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % modes.length;
    setTheme(modes[nextIndex]);
  };

  return (
    <button onClick={cycleTheme} className="">
      <FontAwesomeIcon icon={icon} className="fa-fw" />
    </button>
  );
}
