import SideBar from "@/components/layout/SideBar";

const Home = () => {
  return (
    <div className="min-h-screen flex gap-5">
      <div className="flex-grow max-w-[640px] px-4 border-x">Home</div>
      <SideBar />
    </div>
  );
};

export default Home;
