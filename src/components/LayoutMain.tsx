"use client";

import { useTheme } from "next-themes";
import React from "react";

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div
      className="w-full"
      style={{
        background:
          theme === "dark"
            ? "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)"
            : "linear-gradient(150deg, #B39DDB 0%, #D1C4E9 20%, #F3E5F5 40%, #FCE4EC 60%, #FFCDD2 80%, #FFAB91 100%)",
      }}
    >
      {children}
    </div>
  );
};

export default LayoutMain;
