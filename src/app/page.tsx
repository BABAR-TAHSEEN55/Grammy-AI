"use client";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

import MainContent from "@/components/MainContent";

import { useEffect, useState } from "react";

const Home = () => {
  const [timer, setTimer] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer(true);
    }, 3000);
    return () => clearInterval(timeout);
  });
  // Change it to 80 if you like
  return (
    <main className="grid place-content-center gap-y-2 md:gap-y-8 min-h-[85vh]  relative">
      <Header />
      {timer ? <MainContent /> : <Loader />}
    </main>
  );
};

export default Home;
// TODO :
// 3. Interactions
