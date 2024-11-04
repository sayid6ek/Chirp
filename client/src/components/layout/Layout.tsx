import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import LeftNav from "@/components/layout/LeftNav";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Layout = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <TopNav />
      <div className="min-h-screen flex justify-center">
        <LeftNav />
        <div className="flex-grow max-w-[640px] lg:max-w-[944px] min-h-screen py-[60px] sm:py-0">
          <Outlet />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout;
