import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";

const CreditsSection = async () => {
  const CookiStore = await cookies();
  const GetCredits = CookiStore.get("AnonCredits");
  console.log(GetCredits?.value);
  // return <div className="text-center">Credits : {GetCredits?.value}</div>;
  return <Badge variant={"secondary"}>Badge</Badge>;
};

export default CreditsSection;
