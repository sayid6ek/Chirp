import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  TbSquareRoundedPlus,
  TbMenu2,
  TbSettings,
  TbLogout2,
} from "react-icons/tb";
import { useModal } from "@/contexts/ModalContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

type ErrorResponse = {
  message: string;
};

const LeftNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const { openModal } = useModal();

  const isActive = (path: string) => location.pathname === path;

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/auth/logout");
      return data;
    },
    onSuccess: async () => {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
      toast({
        title: "Logged out successfully.",
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Login failed.",
      });
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="hidden px-2 xl:px-3 py-4 sm:flex flex-col items-center xl:items-start justify-between sticky top-0 left-0 h-screen xl:w-[280px] bg-custom-whit">
      <div className="flex flex-col items-center w-full xl:items-start gap-6">
        <Link to="/" className="w-9 h-9 xl:ml-3">
          <svg
            viewBox="0 0 800 800"
            className="fill-custom-blue-3 dark:fill-[#F5F5F5]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              transform="translate(776,19)"
              d="m0 0 4 1v13l-5 47-8 53-9 47-9 40-11 42-12 39-14 41-10 24-4 4-126 63-19 10-6 3h116l-2 5-10 18-14 22-10 14-8 11-9 4-81 27-41 14-54 18-23 8h-2v2l2-1h138v3l-16 13-19 13-16 10-16 9-25 12-27 10-25 7-29 6-40 5-42 4-43 3-46 2-40 1-25 25-4 5-7 6-5 6-7 6-5 6-7 6-5 6-7 6-5 6-8 7-9 6-10 3h-11l-10-3-8-5-7-8-4-8-1-4v-16l4-10 8-10 178-178h2l2-4h2l2-4h2l2-4h2l2-4h2l2-4h2l2-4 6-5 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 5-6 7-6 105-105 4-8 1-9-3-9-6-7-9-4h-10l-8 4-10 9-258 258h-2l1-31 4-57 4-35 5-31 7-30 11-32 12-27 13-24 14-21 10-14 10-12 7-9h2l2-4 10-10 6-7h2v-2l8-7 15-14 14-11 13-10 17-12 23-15 24-14 28-15 34-16 32-13 26-10 43-14 42-12 36-9 42-9 39-7 46-7 47-5z"
            />
          </svg>
        </Link>

        <div className="flex flex-col space-y-[10px] w-full">
          <Link
            to="/"
            className="flex items-center gap-[10px] w-full h-full px-3 py-[10px] hover:bg-custom-gray-2 rounded-xl"
          >
            {isActive("/") ? (
              <TbHomeFilled className="w-[30px] h-[30px]" />
            ) : (
              <TbHome className="w-[30px] h-[30px] text-custom-gray-3" />
            )}
            <span
              className={`hidden xl:inline-block text-xl ${
                isActive("/")
                  ? "font-semibold text-custom-black-2"
                  : "font-normal text-custom-gray-3"
              }`}
            >
              Home
            </span>
          </Link>

          <Link
            to="/search"
            className="flex items-center gap-[10px] w-full h-full px-3 py-[10px] hover:bg-custom-gray-2 rounded-xl"
          >
            {isActive("/search") ? (
              <TbSearch className="w-[30px] h-[30px]" />
            ) : (
              <TbSearch className="w-[30px] h-[30px] text-custom-gray-3" />
            )}
            <span
              className={`hidden xl:inline-block text-xl ${
                isActive("/search")
                  ? "font-semibold text-custom-black-2"
                  : "font-normal text-custom-gray-3"
              }`}
            >
              Search
            </span>
          </Link>

          <Link
            to="/notifications"
            className="flex items-center gap-[10px] w-full h-full px-3 py-[10px] hover:bg-custom-gray-2 rounded-xl"
          >
            {isActive("/notifications") ? (
              <TbBellFilled className="w-[30px] h-[30px]" />
            ) : (
              <TbBell className="w-[30px] h-[30px] text-custom-gray-3" />
            )}
            <span
              className={`hidden xl:inline-block text-xl ${
                isActive("/notifications")
                  ? "font-semibold text-custom-black-2"
                  : "font-normal text-custom-gray-3"
              }`}
            >
              Notifications
            </span>
          </Link>

          <Link
            to="/messages"
            className="flex items-center gap-[10px] w-full h-full px-3 py-[10px] hover:bg-custom-gray-2 rounded-xl"
          >
            {isActive("/messages") ? (
              <TbMailFilled className="w-[30px] h-[30px]" />
            ) : (
              <TbMail className="w-[30px] h-[30px] text-custom-gray-3" />
            )}
            <span
              className={`hidden xl:inline-block text-xl ${
                isActive("/messages")
                  ? "font-semibold text-custom-black-2"
                  : "font-normal text-custom-gray-3"
              }`}
            >
              Messages
            </span>
          </Link>

          <Link
            to="/bookmarks"
            className="flex items-center gap-[10px] w-full h-full px-3 py-[10px] hover:bg-custom-gray-2 rounded-xl"
          >
            {isActive("/bookmarks") ? (
              <TbBookmarkFilled className="w-[30px] h-[30px]" />
            ) : (
              <TbBookmark className="w-[30px] h-[30px] text-custom-gray-3" />
            )}
            <span
              className={`hidden xl:inline-block text-xl ${
                isActive("/bookmarks")
                  ? "font-semibold text-custom-black-2"
                  : "font-normal text-custom-gray-3"
              }`}
            >
              Bookmarks
            </span>
          </Link>

          <Link
            to={`/${user?.username}`}
            className="flex items-center gap-[10px] w-full h-full px-3 py-[10px] hover:bg-custom-gray-2 rounded-xl"
          >
            {isActive(`/${user?.username}`) ? (
              <TbUserFilled className="w-[30px] h-[30px]" />
            ) : (
              <TbUser className="w-[30px] h-[30px] text-custom-gray-3" />
            )}
            <span
              className={`hidden xl:inline-block text-xl ${
                isActive(`/${user?.username}`)
                  ? "font-semibold text-custom-black-2"
                  : "font-normal text-custom-gray-3"
              }`}
            >
              Profile
            </span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center xl:items-start gap-[10px] w-full">
        <button
          onClick={openModal}
          className="flex items-center gap-[10px] w-full h-full px-3 py-[10px] hover:bg-custom-gray-2 rounded-xl"
        >
          <TbSquareRoundedPlus className="w-[30px] h-[30px] text-custom-gray-3" />
          <span className="hidden xl:inline-block text-xl font-normal text-custom-gray-3">
            Create Post
          </span>
        </button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="w-full">
            <button className="flex items-center gap-[10px] w-full h-full px-3 py-[10px] hover:bg-custom-gray-2 rounded-xl">
              <TbMenu2 className="w-[30px] h-[30px] text-custom-gray-3" />
              <span className="hidden xl:inline-block text-xl font-normal text-custom-gray-3">
                More
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="mb-[6px] p-2 hidden sm:block w-[280px] space-y-2"
          >
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <div className="w-full h-full flex items-center gap-[10px]">
                <TbSettings className="w-[30px] h-[30px] text-custom-gray-3" />
                Settings
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <div className="w-full h-full flex items-center gap-[10px]">
                <TbLogout2 className="w-[30px] h-[30px] text-custom-gray-3" />
                Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LeftNav;
