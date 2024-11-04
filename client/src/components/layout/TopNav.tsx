import { useModal } from "@/contexts/ModalContext";
import {
  TbLogout2,
  TbMenuDeep,
  TbSettings,
  TbSquareRoundedPlus,
} from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type ErrorResponse = {
  message: string;
};

const TopNav = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const { openModal } = useModal();

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
    <div className="sm:hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(200,200,200,0.12)] px-4 bg-custom-white fixed top-0 w-full h-[60px] flex items-center justify-between z-10">
      <Link to="/" className="w-[100px]">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2613.000000 833.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,833.000000) scale(0.100000,-0.100000)"
            className="fill-custom-blue-3 dark:fill-[#F5F5F5]"
            stroke="none"
          >
            <path
              d="M7726 8099 c-1293 -143 -2610 -488 -3586 -941 -590 -274 -1151 -634
-1544 -992 -140 -127 -325 -316 -340 -347 -5 -10 -14 -19 -21 -21 -13 -3 -150
-169 -228 -277 -175 -239 -300 -454 -410 -706 -206 -472 -299 -916 -358 -1715
-24 -325 -36 -670 -23 -670 5 0 634 625 1399 1389 1124 1124 1400 1394 1442
1415 66 33 123 34 195 2 121 -53 171 -203 109 -324 -11 -21 -434 -450 -980
-995 -529 -526 -961 -962 -961 -967 0 -6 -6 -10 -14 -10 -8 0 -18 -9 -21 -20
-3 -11 -12 -20 -20 -20 -8 0 -17 -9 -20 -20 -3 -11 -12 -20 -19 -20 -7 0 -18
-11 -24 -25 -6 -14 -18 -25 -26 -25 -8 0 -18 -9 -21 -20 -3 -11 -12 -20 -20
-20 -8 0 -17 -9 -20 -20 -3 -11 -12 -20 -18 -20 -7 0 -443 -431 -969 -957
-1099 -1102 -1018 -1007 -1018 -1194 0 -117 14 -161 76 -236 72 -88 170 -133
289 -133 89 0 152 18 222 65 30 20 252 234 492 476 l436 439 160 0 c453 1
1296 58 1829 126 533 67 978 207 1391 437 235 131 615 402 615 440 0 16 -38
17 -730 15 -402 -2 -730 0 -730 3 0 4 12 9 28 12 53 9 2087 698 2126 720 28
15 65 56 123 137 147 204 344 525 359 587 l6 23 -593 2 -594 3 780 392 c429
215 788 400 797 410 43 47 187 437 319 863 175 561 321 1209 419 1858 50 329
90 696 90 818 l0 94 -67 -1 c-38 -1 -184 -14 -327 -30z"
            />
            <path
              d="M15210 6979 c-148 -13 -332 -38 -480 -65 -151 -28 -458 -100 -478
-113 -11 -6 -11 -23 -3 -85 18 -125 13 -391 -9 -591 -52 -456 -168 -1031 -415
-2065 -348 -1456 -457 -2112 -381 -2294 l16 -39 143 7 c324 16 629 61 988 147
l166 40 6 222 c6 238 24 396 82 732 74 428 220 1093 244 1113 48 38 222 113
288 124 125 21 158 -13 157 -157 -1 -108 -35 -285 -133 -681 -127 -512 -156
-686 -155 -924 1 -134 5 -180 22 -242 30 -111 66 -181 129 -249 143 -154 392
-193 743 -117 274 59 726 250 922 390 l46 33 -62 172 c-33 94 -64 174 -67 178
-4 3 -89 -17 -190 -44 -184 -50 -184 -50 -204 -30 -17 17 -20 36 -23 132 -5
147 19 283 138 767 134 546 164 715 164 920 0 147 -15 216 -74 337 -71 145
-187 240 -355 293 -88 27 -298 38 -401 21 -175 -30 -380 -106 -642 -241 -149
-76 -173 -86 -168 -67 20 74 165 740 206 946 150 759 183 1159 114 1391 l-15
50 -112 -1 c-62 -1 -155 -5 -207 -10z"
            />
            <path
              d="M11720 6810 c-512 -63 -996 -317 -1397 -734 -529 -550 -833 -1376
-833 -2267 0 -855 274 -1487 798 -1840 357 -240 810 -320 1288 -229 245 48
598 185 804 313 215 134 555 424 682 581 l39 49 -167 168 -167 167 -111 -90
c-274 -222 -540 -364 -772 -413 -106 -23 -289 -23 -374 -1 -121 31 -206 80
-300 175 -68 69 -95 106 -137 187 -88 168 -137 351 -167 614 -46 403 -20 949
65 1375 58 291 146 562 259 800 247 520 524 713 871 606 113 -35 110 2 34
-386 l-67 -340 39 -32 c196 -165 690 -329 1079 -358 l90 -7 41 54 c93 121 143
232 176 388 27 128 29 347 3 440 -106 393 -525 672 -1151 766 -119 18 -517 27
-625 14z"
            />
            <path
              d="M18413 6671 c-280 -45 -517 -224 -595 -449 -30 -87 -32 -255 -4 -347
44 -148 150 -278 282 -347 181 -95 452 -111 662 -39 117 41 184 84 283 181
132 131 189 265 189 445 0 173 -48 293 -156 394 -117 110 -263 160 -479 166
-71 2 -153 0 -182 -4z"
            />
            <path
              d="M21752 4910 c-155 -42 -331 -159 -518 -345 l-112 -111 -6 60 c-8 78
-47 226 -80 299 l-25 57 -68 0 c-160 -1 -601 -21 -753 -35 -283 -26 -572 -82
-589 -113 -5 -10 -11 -36 -12 -60 -3 -39 1 -46 47 -95 97 -99 174 -241 195
-357 9 -55 9 -88 0 -162 -18 -129 -77 -458 -161 -883 -82 -419 -153 -832 -171
-994 -11 -109 -7 -316 8 -392 l6 -32 331 6 c426 8 681 33 889 88 l77 21 0 202
c0 277 23 481 101 891 31 164 166 869 175 916 8 40 172 149 224 149 35 0 96
-69 168 -190 l69 -115 49 2 c110 5 328 87 453 172 76 52 243 210 283 269 30
44 31 46 24 131 -9 127 -49 289 -95 386 -52 111 -129 191 -216 225 -84 32
-198 36 -293 10z"
            />
            <path
              d="M24605 4914 c-175 -31 -401 -125 -575 -239 -47 -31 -89 -57 -93 -58
-5 -1 -18 31 -28 72 -11 41 -31 99 -44 130 l-23 56 -134 3 c-275 7 -786 -27
-1028 -68 -128 -22 -271 -56 -281 -68 -3 -4 -9 -29 -12 -57 -5 -49 -5 -50 34
-79 76 -54 151 -201 183 -358 27 -130 38 -356 26 -503 -23 -275 -102 -731
-270 -1555 -234 -1152 -289 -1524 -261 -1780 11 -102 34 -194 51 -205 22 -13
518 40 710 76 134 26 318 72 435 109 l91 30 12 227 c12 236 38 493 73 718 19
125 78 458 82 461 1 1 56 -16 121 -38 213 -70 445 -98 656 -78 445 40 770 229
1006 586 277 419 401 913 366 1465 -30 477 -129 756 -339 949 -198 182 -469
255 -758 204z m-294 -737 c99 -66 134 -267 110 -617 -28 -401 -99 -694 -232
-970 -51 -104 -72 -135 -128 -191 -99 -100 -174 -116 -341 -77 -25 6 -48 13
-52 17 -4 3 0 38 8 76 104 492 238 1328 260 1622 l7 92 73 27 c97 35 128 42
200 43 48 1 68 -4 95 -22z"
            />
            <path
              d="M18495 4890 c-428 -11 -701 -35 -923 -81 -113 -24 -116 -26 -126
-104 -7 -49 -6 -51 49 -125 66 -88 139 -231 160 -313 8 -32 17 -91 21 -130 11
-121 -37 -353 -186 -912 -58 -219 -112 -464 -137 -621 -23 -150 -23 -386 1
-474 59 -216 194 -348 416 -407 86 -22 293 -22 415 1 217 40 471 131 701 250
132 68 314 184 314 201 0 6 -27 87 -61 182 l-61 172 -37 -16 c-58 -25 -219
-72 -270 -79 -93 -12 -116 28 -114 196 2 160 37 327 208 990 101 391 139 622
138 845 -1 171 -18 265 -64 357 -35 70 -46 78 -103 76 -28 -1 -181 -5 -341 -8z"
            />
          </g>
        </svg>
      </Link>

      <div className="flex items-center gap-4">
        <button onClick={openModal}>
          <TbSquareRoundedPlus className="w-[30px] h-[30px] text-custom-gray-3 hover:text-custom-black-2" />
        </button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="flex">
            <button>
              <TbMenuDeep className="w-[30px] h-[30px] text-custom-gray-3 hover:text-custom-black-2" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="-translate-x-4 p-2 w-[250px] space-y-2">
            <DropdownMenuItem
              onClick={() => navigate("/settings")}
              className="py-2"
            >
              <div className="w-full h-full flex items-center gap-[10px] text-lg">
                <TbSettings className="w-[28px] h-[28px] text-custom-gray-3" />
                Settings
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="py-2">
              <div className="w-full h-full flex items-center gap-[10px] text-lg">
                <TbLogout2 className="w-[28px] h-[28px] text-custom-gray-3" />
                Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNav;
