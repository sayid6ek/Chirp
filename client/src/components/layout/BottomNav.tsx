import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  TbHome,
  TbHomeFilled,
  TbSearch,
  TbBell,
  TbBellFilled,
  TbMail,
  TbMailFilled,
  TbBookmark,
  TbBookmarkFilled,
  TbUser,
  TbUserFilled,
} from "react-icons/tb";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sm:hidden shadow-[0_-8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_-8px_30px_rgb(200,200,200,0.12)] bg-custom-white fixed bottom-0 w-full h-[60px] p-[6px] flex items-center justify-around z-10">
      <Link
        to="/"
        className="w-full h-full hover:bg-custom-gray-2 grid place-items-center rounded-xl"
      >
        {isActive("/") ? (
          <TbHomeFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbHome className="w-[30px] h-[30px] text-custom-gray-3" />
        )}
      </Link>

      <Link
        to="/search"
        className="w-full h-full hover:bg-custom-gray-2 grid place-items-center rounded-xl"
      >
        {isActive("/search") ? (
          <TbSearch className="w-[30px] h-[30px]" />
        ) : (
          <TbSearch className="w-[30px] h-[30px] text-custom-gray-3" />
        )}
      </Link>

      <Link
        to="/notifications"
        className="w-full h-full hover:bg-custom-gray-2 grid place-items-center rounded-xl"
      >
        {isActive("/notifications") ? (
          <TbBellFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbBell className="w-[30px] h-[30px] text-custom-gray-3" />
        )}
      </Link>

      <Link
        to="/messages"
        className="w-full h-full hover:bg-custom-gray-2 grid place-items-center rounded-xl"
      >
        {isActive("/messages") ? (
          <TbMailFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbMail className="w-[30px] h-[30px] text-custom-gray-3" />
        )}
      </Link>

      <Link
        to="/bookmarks"
        className="w-full h-full hover:bg-custom-gray-2 grid place-items-center rounded-xl"
      >
        {isActive("/bookmarks") ? (
          <TbBookmarkFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbBookmark className="w-[30px] h-[30px] text-custom-gray-3" />
        )}
      </Link>

      <Link
        to={`/${user?.username}`}
        className="w-full h-full hover:bg-custom-gray-2 grid place-items-center rounded-xl"
      >
        {isActive(`/${user?.username}`) ? (
          <TbUserFilled className="w-[30px] h-[30px]" />
        ) : (
          <TbUser className="w-[30px] h-[30px] text-custom-gray-3" />
        )}
      </Link>
    </div>
  );
};

export default BottomNav;
