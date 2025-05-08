import { data, Link, useNavigate } from "react-router-dom";
import googlePNG from "./../../assets/google.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
  const { signupStatus, setSignupStatus } = useAuth();
  const navigate = useNavigate();

  const [inputErrors, setInputErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function validate() {
    const errors = {};

    if (!formData.username.trim())
      errors.username = "Username may not be blank";
    if (!formData.email.trim()) errors.email = "Email may not be blank";
    if (!formData.password.trim())
      errors.password = "Password may not be blank";

    return errors;
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setInputErrors(validationErrors);
      setIsError(true);

      setTimeout(() => {
        setIsFadingOut(true);
      }, 5000);

      setTimeout(() => {
        setIsError(false);
        setIsFadingOut(false);
        setInputErrors({});
      }, 5250);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/account/register/",
        requestOptions,
      );
      const data = await response.json();

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      if (typeof data.username === "string") {
        localStorage.setItem(
          "signupUser",
          JSON.stringify({
            username: data.username,
            email: data.email,
          }),
        );
        navigate("/signup/status", {
          state: { username: data.username, email: data.email },
        });
      } else {
        setInputErrors((prevErrors) => {
          const newErrors = { ...prevErrors };

          if (data.username) {
            newErrors.username = data.username[0];
          }

          if (data.email) {
            newErrors.email = data.email[0];
          }

          return newErrors;
        });

        setIsError(true);

        setTimeout(() => {
          setIsFadingOut(true);
        }, 5000);

        setTimeout(() => {
          setIsError(false);
          setIsFadingOut(false);
          setInputErrors({});
        }, 5250);

        return;
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }

  const inputStyle =
    "input-one font-poppins text-[0.8rem] w-[97%] outline-0 border-solid border-[2px] border-white bg-[#718bab] text-white p-[7px] pl-[10px] rounded-[5px]";

  const labelStyle = "font-poppins text-[0.9rem] mt-[5px]";

  return (
    <>
      {(isError || isFadingOut) && (
        <div
          className={`${isFadingOut ? "fade-out" : "fade-in"} fixed top-0 right-0 left-0 flex justify-end pt-3 pr-3`}
        >
          <div className="font-poppins rounded-md bg-red-400 px-6 py-4 text-xs/5 font-medium text-white">
            {inputErrors.username && (
              <p>
                <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                {inputErrors.username}
              </p>
            )}
            {inputErrors.email && (
              <p>
                <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                {inputErrors.email}
              </p>
            )}
            {inputErrors.password && (
              <p>
                <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                {inputErrors.password}
              </p>
            )}
          </div>
        </div>
      )}
      <main className="fade-in mx-auto my-[120px] flex w-fit justify-center rounded-[20px] shadow-md">
        <div className="flex h-[500px] w-[380px] flex-col items-center justify-center rounded-l-[20px] bg-[#f5f5f5]">
          <h1 className="signup-qt">
            <span className="font-poppins font-outline-1 text-[6rem] font-bold text-white">
              Q
            </span>
            <span className="font-poppins font-outline-2 text-[6rem] font-bold text-white">
              T
            </span>
          </h1>
          <h1>
            <span className="font-poppins text-[2rem] font-bold text-[#153969]">
              Quick{" "}
            </span>
            <span className="font-poppins text-[2rem] font-bold text-[#718bab]">
              Trade
            </span>
          </h1>
        </div>
        <div className="font=[1.3rem] flex h-[500px] w-[380px] flex-col rounded-r-[20px] bg-[#153969] p-[30px] text-white">
          <h1 className="font-poppins text-[41.6px] font-bold">Welcome</h1>
          <form className="flex flex-col items-start" onSubmit={handleSubmit}>
            <label htmlFor="username" className={labelStyle}>
              Username:
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className={inputStyle}
              onChange={handleChange}
              value={formData.username}
            />
            <label htmlFor="email" className={labelStyle}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={inputStyle}
              onChange={handleChange}
              value={formData.email}
            />
            <label htmlFor="password" className={labelStyle}>
              Password:
            </label>
            <input
              onChange={handleChange}
              id="password"
              type="password"
              name="password"
              className={inputStyle}
              value={formData.password}
            />
            <button className="font-poppins mt-[30px] w-[97%] cursor-pointer rounded-[5px] border-none bg-white px-[13px] py-[9px] text-[1.3rem] font-semibold text-[#153969] shadow-[0_0_5px_rgba(0,0,0,0.2)] transition-all duration-200 hover:opacity-80">
              Sign up
            </button>
          </form>
          <hr className="mt-[20px] mr-[10px] mb-[20px] w-[90%] self-center" />
          <button className="font-poppins flex w-[97%] cursor-pointer items-center justify-center rounded-[5px] border-none bg-white p-[7px] text-[0.8rem] font-bold text-[#153969] shadow-md transition-all duration-200 hover:opacity-80">
            <img
              src={googlePNG}
              alt="google icon"
              className="mr-[5px] w-[14px]"
            />
            Sign up with Google
          </button>
          <p className="font-poppins mt-[7px] text-center text-[0.7rem]">
            Already have an account? {""}
            <Link className="text-white underline" to={"/signin"}>
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
