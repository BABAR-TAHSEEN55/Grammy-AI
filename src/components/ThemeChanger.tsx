"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeChanger = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="h-screen w-full relative ">
      {theme == "dark" ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
          }}
        >
          {children}
        </div>
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(150deg, #B39DDB 0%, #D1C4E9 20%, #F3E5F5 40%, #FCE4EC 60%, #FFCDD2 80%, #FFAB91 100%)`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ThemeChanger;
