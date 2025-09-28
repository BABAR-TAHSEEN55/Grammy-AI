import Header from "@/components/Header";
import MainContent from "@/components/MainContent";

const Home = () => {
  return (
    <main className="grid place-content-center gap-y-2 md:gap-y-8 min-h-[80vh]  relative">
      <Header />
      <MainContent />
    </main>
  );
};

export default Home;
