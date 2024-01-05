import { useContext } from "react";
import { UserIcon } from "../icons/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// import { base_url } from "../utils/baseUrl";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const userName = userInfo?.userName;

  // function handleLogout() {
  //   fetch(`${base_url}api/user/logout`, {
  //     method: "POST",
  //     credentials: "include",
  //   });
  //   setUserInfo(null);
  //   window.location.reload()
  // }

  return (
    <div className="w-full min-h-[56px] dark fixed top-0 z-40">
      <div className="container flex justify-between items-center py-2">
        <div className="primary">
          <Link to={"/"} className="text-2xl font-bold">
            Portfolio
          </Link>
        </div>
        <p className="text-3xl font-semibold">Dashboard</p>

        {/* When login */}
        {userName && (
          <div
            // onClick={handleLogout}
            className="flex items-center gap-2 border border-gray-400/40 p-2 rounded-full cursor-pointer"
          >
            <p>Logout</p>
            <div className="bg-gray-400/20 text-gray-100 rounded-full w-7 h-7 flex justify-center items-center">
              <UserIcon />
            </div>
          </div>
        )}

        {/* When logout */}
        {!userName && (
          <Link
            to={"/login"}
            className="flex items-center gap-2 border border-gray-400/40 p-2 rounded-full"
          >
            <p>Login</p>
            <div className="bg-gray-400/20 text-gray-100 rounded-full w-7 h-7 flex justify-center items-center">
              <UserIcon />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
