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
  return (
    <main className="grid place-content-center gap-y-2 md:gap-y-8 min-h-[80vh]  relative">
      <Header />
      {timer ? <MainContent /> : <Loader />}
    </main>
  );
};

export default Home;
// TODO :
// 2. Add Context with backend support
// 3. Interactions
// 4. Credits System 2 Credit
// 4.DEPLOY ( Deadline : 3)
