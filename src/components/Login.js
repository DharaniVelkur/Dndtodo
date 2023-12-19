import React, { useState, useEffect } from "react";
import usericon from "../utils/usericon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import "react-circular-progressbar/dist/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spin, setSpin] = useState(false);
  let navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setSpin(true);
    const data = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const response = await data.json();

    if (data.status === 200) {
      setSpin(false);
      setEmail("");
      setPassword("");
      localStorage.setItem(
        "dnduser",
        JSON.stringify(response.result.uservalid)
      );
      localStorage.setItem("dndtoken", response.result.token);
      toast.success("Logged in Successfully!!");
      navigate("/body");
    } else {
      setSpin(false);
      setEmail("");
      setPassword("");
      toast.error(response.error);
    }
  };

  const validuser = async () => {
    let token = localStorage.getItem("dndtoken");
    const res = await fetch("http://localhost:8000/validuser", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    const data = await res.json();
    if (res.status === 200) {
      navigate("/body");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    validuser();
  }, []);

  return (
    <>
      <div className="pt-28 w-screen h-screen bg-slate-200">
        <div className="text-center lg:w-4/12 md:w-6/12 sm:w-8/12 mx-auto left-0 right-0 login">
          <img
            src={usericon}
            alt="user"
            className="w-36 left-0 right-0 mx-auto"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          {spin ? (
            <button className="w-8/12 p-3 mt-3 mb-10 border bg-white rounded-lg" >
            <CircularProgress size="1.2rem"/>
            </button>
          ) : (
            <button
              className="w-8/12 p-3 mt-3 mb-10 border bg-white rounded-lg font-bold font-serif"
              onClick={loginUser}
            >
              Login
            </button>
          )}

          <p className=" pb-2 ">
            New User?&nbsp;
            <Link to={"/register"}>
              <span className="cursor-pointer hover:text-lime-500 font-bold">
                Register Now.
              </span>
            </Link>
          </p>
          <p
            className=" pb-6 cursor-pointer hover:underline font-bold"
            onClick={() => navigate("/resetpassword")}
          >
            Forgot Password?
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
