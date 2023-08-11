import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");  

  const handleRegister = async() => {
    const res = await fetch('http://localhost:5010/api/user/register', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({userName, password})
    })

    if (res.status === 200){
      alert('Registration Successfull')
    navigate("/login", { replace: true });
    }else if (res.status === 400){
      alert('Username already exist')
    }else{
      alert('Registration Failure');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <label htmlFor="userName" className="block font-semibold mb-1">
            Email
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="text-center">
          If you are already Registered,
          <Link to={'/login'} className="primary underline font-semibold p-2 hover:cursor-pointer">Login</Link>now.
        </div>
      </div>
    </div>
  );
};

export default Register;
