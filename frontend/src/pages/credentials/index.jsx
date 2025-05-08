import { useState } from "react";
import banner from "../../assets/QUICK TRADE.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CredentialsPage() {
  const nav = useNavigate();
  const localData = JSON.parse(localStorage.getItem("signupUser"));

  const [inputErrors, setInputErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingOut1, setIsFadingOut1] = useState(false);
  const [isFadingOut2, setIsFadingOut2] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [submitError, setSubmitError] = useState("");
  const [isSubmitError, setIsSubmitError] = useState(false);

  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: localData?.username,
    email: localData?.email,
    valid_id: null,
    first_name: "",
    last_name: "",
    sex: "",
    address: "",
    contact_number: "",
  });

  function validate() {
    const errors = {};

    if (!formData.valid_id) errors.valid_id = "Valid id may not be blank";
    if (!formData.first_name.trim())
      errors.first_name = "First name may not be blank";
    if (!formData.last_name.trim())
      errors.last_name = "Last name may not be blank";
    if (!formData.sex) errors.sex = "Sex may not be blank";
    if (!formData.address) errors.address = "Address may not be blank";
    if (!formData.contact_number)
      errors.contact_number = "Contact number may not be blank";

    return errors;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  function handleConfirm() {
    setIsConfirm(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirm(false);

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

    const formPayload = new FormData();
    formPayload.append("username", formData.username);
    formPayload.append("email", formData.email);
    formPayload.append("valid_id", formData.valid_id);
    formPayload.append("first_name", formData.first_name);
    formPayload.append("last_name", formData.last_name);
    formPayload.append("sex", formData.sex);
    formPayload.append("address", formData.address);
    formPayload.append("contact_number", formData.contact_number);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/credentials/",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      console.log("Success:", response.data);
      setSubmitSuccess("Credentials submitted successfully!");
      setIsSubmitSuccess(true);

      setTimeout(() => {
        setIsFadingOut(true);
      }, 5000);

      setTimeout(() => {
        setIsSubmitSuccess(false);
        setIsFadingOut1(false);
        setSubmitError("");
      }, 5250);

      setTimeout(() => {
        localStorage.removeItem("signupUser");
        nav("/signin");
      }, 5300);
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        setSubmitError(
          "Please make sure to sign up first before submitting your credentials.",
        );
        setIsSubmitError(true);

        setTimeout(() => {
          setIsFadingOut2(true);
        }, 5000);

        setTimeout(() => {
          setIsSubmitError(false);
          setIsFadingOut2(false);
          setSubmitError("");
        }, 5250);
        return;
      } else {
        console.error("Unexpected error:", error);
        setSubmitError("An unexpected error occurred.");
      }
    }
  };

  const inputStyle =
    "input-one font-poppins text-[0.8rem] w-[97%] outline-0 border-solid border-[2px] border-white bg-[#718bab] text-white p-[7px] pl-[10px] rounded-md";
  return (
    <>
      {isConfirm && (
        <div className="font-poppins fixed inset-0 top-10 z-20 flex items-center justify-center">
          <div className="text-primary flex flex-col gap-5 rounded-md bg-white px-20 py-15">
            <h1 className="w-60 text-center text-2xl font-semibold">
              Are you sure you want to proceed?
            </h1>
            <div className="flex justify-center gap-5">
              <button
                onClick={() => setIsConfirm(false)}
                className="bg-thirdary cursor-pointer rounded-md px-8 py-1 font-medium text-white transition-all duration-150 hover:opacity-70"
              >
                No
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primary cursor-pointer rounded-md px-8 py-1 font-medium text-white transition-all duration-150 hover:opacity-70"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {(isSubmitError || isFadingOut2) && (
        <div
          className={`${isFadingOut2 ? "fade-out" : "fade-in"} font-poppins fixed top-5 right-5 z-20 w-75 rounded-md bg-red-400 p-5 text-sm font-medium text-white`}
        >
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {submitError}
        </div>
      )}

      {(isSubmitSuccess || isFadingOut1) && (
        <div
          className={`${isFadingOut1 ? "fade-out" : "fade-in"} font-poppins fixed top-5 right-5 z-20 w-75 rounded-md bg-green-400 p-5 text-sm font-medium text-white`}
        >
          <i class="fa-solid fa-circle-check mr-2"></i>
          {submitSuccess} Please wait as you are being redirected.
        </div>
      )}

      <main
        className={`${isConfirm && "pointer-events-none blur-sm"} fade-in font-poppins mx-auto my-[120px] flex w-fit justify-center rounded-[20px] shadow-md`}
      >
        <div className="flex w-[380px] flex-col items-center justify-center rounded-l-[20px] bg-[#f5f5f5]">
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
        <div className="font=[1.3rem] w-[380px] flex-col rounded-r-[20px] bg-[#153969] p-[30px] text-white">
          <h1 className="font-poppins text-[41.6px] font-bold">Credentials</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsConfirm(true);
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label>Valid ID</label>
              <input
                type="file"
                name="valid_id"
                accept="image/*"
                onChange={handleChange}
                className="input-one bg-thirdary w-full cursor-pointer rounded-md border-2 border-white px-2 py-1 text-white transition-all duration-150 outline-none hover:opacity-70"
              />
              {inputErrors.valid_id && (
                <p
                  className={`${isFadingOut ? "fade-out" : "fade-in"} mt-1 text-sm`}
                >
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                  {inputErrors.valid_id}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-white">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input-one bg-thirdary w-full rounded-md border-2 border-white px-2 py-1 text-white outline-none"
              />
              {inputErrors.first_name && (
                <p
                  className={`${isFadingOut ? "fade-out" : "fade-in"} mt-1 text-sm`}
                >
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                  {inputErrors.first_name}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-white">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input-one bg-thirdary w-full rounded-md border-2 border-white px-2 py-1 text-white outline-none"
              />
              {inputErrors.last_name && (
                <p
                  className={`${isFadingOut ? "fade-out" : "fade-in"} mt-1 text-sm`}
                >
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                  {inputErrors.last_name}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-white">Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="input-one bg-thirdary w-full rounded-md border-2 border-white px-2 py-1 text-white outline-none"
              >
                <option value="">Select sex</option>
                {/* You should fetch options from your API and map them here */}
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </select>
              {inputErrors.sex && (
                <p
                  className={`${isFadingOut ? "fade-out" : "fade-in"} mt-1 text-sm`}
                >
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                  {inputErrors.sex}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-thirdary max-h-15 min-h-15 w-full rounded-md border-2 border-white px-2 py-1 text-white outline-none"
              />
              {inputErrors.address && (
                <p
                  className={`${isFadingOut ? "fade-out" : "fade-in"} mt-1 text-sm`}
                >
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                  {inputErrors.address}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="tetx-primary text-sm">Contact Number</label>
              <input
                type="number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                className="input-one bg-thirdary w-full rounded-md border-2 border-white px-2 py-1 text-white outline-none"
              />
              {inputErrors.contact_number && (
                <p
                  className={`${isFadingOut ? "fade-out" : "fade-in"} mt-1 text-sm`}
                >
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>{" "}
                  {inputErrors.contact_number}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="text-primary mt-2 cursor-pointer rounded-md bg-white px-4 py-2 font-semibold transition-all duration-150 hover:opacity-70"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
