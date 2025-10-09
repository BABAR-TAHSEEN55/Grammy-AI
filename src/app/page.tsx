"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

import MainContent from "@/components/MainContent";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";

const Home = () => {
  const [timer, setTimer] = useState<boolean>(false);
  const notfify = () =>
    toast("GrammyAI might fumble sometimes.Do not Worry & Try again ^_^");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimer(true);
    }, 3000);
    notfify();
    return () => clearInterval(timeout);
  }, []);
  // Change it to 80 if you like
  return (
    <main className="flex flex-col justify-between min-h-[85vh] relative">
      <div className="flex-grow grid place-content-center gap-y-2 md:gap-y-8">
        <Header />
        {timer ? <MainContent /> : <Loader />}
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        theme="dark"
        className={"py-2"}
        autoClose={2700}
      />
    </main>
  );
};

export default Home;
// TODO :
// 3. Interactions
