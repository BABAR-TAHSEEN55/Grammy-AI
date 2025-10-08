"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InfinityIcon } from "lucide-react";

const CreditsSection = () => {
  const FetchData = async () => {
    const Response = await axios.get("/api/credits").then((res) => {
      return res.data.Credits;
    });
    console.log(Response);
    return Response;
  };
  const { data: Credits, isLoading } = useQuery({
    queryKey: ["Credits"],
    queryFn: FetchData,
  });
  // return <div className="text-center">Credits : {GetCredits?.value}</div>;
  // return <Badge variant={"destructive"}>Credits : {Credits}</Badge>;
  if (isLoading) {
    return (
      <div>
        Credits : <InfinityIcon />
      </div>
    );
  }

  const isInfinite = Credits === "inifinite";
  const creditsValue = Credits === undefined ? "0" : Credits;

  return (
    <div>
      <div className="text-xs space-x-2 flex">
        Credits : {isInfinite ? <InfinityIcon /> : creditsValue}
      </div>
    </div>
  );
};

export default CreditsSection;
