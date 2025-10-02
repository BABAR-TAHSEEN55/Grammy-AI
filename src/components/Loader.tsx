"use client";
import * as animationData from "@/../public/cat Mark loading.json";
import { useLottie } from "lottie-react";

const Loader = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
    style: {
      width: 200,
      height: 150,
    },
  };

  const { View } = useLottie(defaultOptions);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur z-50">
      {/*<Image src={gif} alt="Loader" height={300} width={300} />*/}
      {View}
    </div>
  );
};

export default Loader;
