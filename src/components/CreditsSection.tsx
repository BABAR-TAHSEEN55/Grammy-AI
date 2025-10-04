import { cookies } from "next/headers";

const CreditsSection = async () => {
  const CookiStore = await cookies();
  const GetCredits = CookiStore.get("AnonCredits");
  console.log(GetCredits?.value);
  return <div className="text-center">Credits : {GetCredits?.value}</div>;
};

export default CreditsSection;
