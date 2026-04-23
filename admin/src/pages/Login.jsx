import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext"; // ✅ fixed typo
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin login successful!");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
  const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor login successful!");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center bg-gray-100"
    >
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 bg-white border rounded-xl text-gray-700 text-sm shadow-lg">
        {/* Heading */}
        <p className="text-2xl font-semibold m-auto flex gap-2">
          <span className="text-blue-600">{state}</span>
          <span className="text-black">Login</span>
        </p>

        {/* Email */}
        <div className="w-full">
          <p className="mb-1">Email</p>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full  border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p className="mb-1">Password</p>
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Toggle between Admin and Doctor */}
        <p className="text-sm text-gray-600 m-auto">
          {state === "Admin" ? (
            <>
              Doctor Login?{" "}
              <button
                type="button"
                onClick={() => setState("Doctor")}
                className="text-blue-600 hover:underline"
              >
                Click here
              </button>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <button
type="button"
                onClick={() => setState("Admin")}
                className="text-blue-600 hover:underline"
              >
                Click here
              </button>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
