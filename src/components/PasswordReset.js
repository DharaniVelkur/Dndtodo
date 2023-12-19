import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const PasswordReset = () => {
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState(false);
  let [spin, setSpin] = useState(false);

  const sendLink = async (e) => {
    setSpin(true);
    e.preventDefault();
    const res = await fetch(
      "https://dndtodo-backend.onrender.com/sendpasswordlink",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );
    let data = await res.json();
    if (res.status === 200) {
      setSpin(false);
      setEmail("");
      setMessage(true);
    } else {
      setSpin(false);
      setEmail("");
      toast.error(data.error);
    }
  };

  return (
    <>
      <div className="bg-slate-200 h-screen pt-16 ">
        <div className="text-center lg:w-4/12 md:w-6/12 sm:w-8/12 mx-auto left-0 right-0 login">
          <p className="font-bold font-serif p-4" style={{ fontSize: "30px" }}>
            Enter Your Email Address
          </p>
          {message ? (
            <p className="text-green-500">Email sent successfully!!!</p>
          ) : (
            ""
          )}
          <input
            type="email"
            placeholder="Email address"
            className="w-8/12 p-3 my-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {spin ? (
            <button className="w-8/12 p-3 mt-3 mb-10 border bg-white rounded-lg">
              <CircularProgress size="1.2rem" />
            </button>
          ) : (
            <button
              className="w-8/12 p-3 mt-3 mb-10 border bg-white rounded-lg font-bold font-serif"
              onClick={sendLink}
            >
              Send
            </button>
          )}
          <p className=" pb-6 ">
            <Link to={"/"}>
              <span className="cursor-pointer hover:text-lime-500 font-bold">
                &larr;Back to Login
              </span>
            </Link>
          </p>
          {/* <p className=" pb-6 cursor-pointer hover:underline font-bold">Forgot Password?</p> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PasswordReset;
