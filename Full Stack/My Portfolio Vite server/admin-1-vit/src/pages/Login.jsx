import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { base_url } from "../utils/baseUrl";

const Login = () => {
  const { setUserInfo } = useContext(UserContext)

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch(`${base_url}/api/user/login`, {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      res.json().then((userData) => {
        setUserInfo(userData);
        navigate("/project", { replace: true });
      });
    } else {
      alert("Wrong credentials");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>

        {/* google Auth */}
        <Link className="mb-4 w-full p-1 flex justify-center items-center border rounded-full bg-gray-400/20">
          <span className="font-semibold">Signin with Google: </span>
          <img
            className="ml-2 w-6 h-6"
            src={"/public/google.svg"}
            alt="google"
          />
        </Link>

        {/* credential input */}
        <div className="mb-4">
          <label htmlFor="userName" className="block font-semibold mb-1">
            Username:
          </label>
          <input
            type="userName"
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* button */}
        <button
          className="w-full mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* go to Register Page */}
        <div className="text-center">
          If you aren't Registered,
          <Link
            to={"/register"}
            className="primary underline font-semibold p-2 hover:cursor-pointer"
          >
            Register
          </Link>
          now.
        </div>
      </div>
    </div>
  );
};

export default Login;
