import HomeSidebar from "./components/HomeSidebar";
import Header from "../../components/Header.jsx";
import { useAuth } from "../../context/AuthContext";
import { sendReport } from "../../endpoints/api.js";
import { useState } from "react";

export default function ReportPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isFadingOut1, setIsFadingOut1] = useState(false);
  const [isFadingOut2, setIsFadingOut2] = useState(false);

  function handleChange(event) {
    const { value } = event.currentTarget;
    setMessage(value);
  }

  async function handleSubmit(event) {
    setIsConfirm(false);
    event.preventDefault();

    try {
      await sendReport(message);
      setMessage("");
      setSubmitStatus("Report submission successful!");

      setIsSuccess(true);

      setTimeout(() => {
        setIsFadingOut1(true);
      }, 5000);

      setTimeout(() => {
        setIsFadingOut1(false);
        setIsSuccess(false);
        setSubmitStatus("");
      }, 5250);
    } catch (error) {
      setMessage("");
      setSubmitStatus("Report submission failed!");

      setIsFail(true);

      setTimeout(() => {
        setIsFadingOut2(true);
      }, 5000);

      setTimeout(() => {
        setIsFadingOut2(false);
        setIsFail(false);
        setSubmitStatus("");
      }, 5250);
    }
  }
  return (
    <>
      <HomeSidebar />
      <Header user={user} />

      {isConfirm && (
        <div className="font-poppins fixed top-70 right-110 z-20 flex items-center justify-center">
          <div className="text-primary flex flex-col gap-5 rounded-md border-1 border-gray-400 bg-white px-15 py-15">
            <h1 className="w-80 text-center text-2xl font-semibold">
              Are you sure you want to submit this report?{" "}
            </h1>
            <div className="flex justify-center gap-5">
              <button
                onClick={() => setIsConfirm(false)}
                className="trynsition-all cursor-pointer rounded-md bg-red-400 px-8 py-1 font-medium text-white duration-150 hover:opacity-70"
              >
                No
              </button>
              <button
                onClick={handleSubmit}
                className="cursor-pointer rounded-md bg-green-400 px-8 py-1 font-medium text-white transition-all duration-150 hover:opacity-70"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {(isSuccess || isFadingOut1) && (
        <div
          className={`${isFadingOut1 ? "fade-out" : "fade-in"} fixed right-5 bottom-5 z-2 rounded-md bg-green-400 p-5 font-medium text-white`}
        >
          <i className="fa-solid fa-circle-check mr-2"></i>
          {submitStatus}
        </div>
      )}
      {(isFail || isFadingOut2) && (
        <div
          className={`${isFadingOut2 ? "fade-out" : "fade-in"} fixed right-5 bottom-5 z-2 rounded-md bg-red-400 p-5 font-medium text-white`}
        >
          <i className="fa-solid fa-circle-check mr-2"></i>
          {submitStatus}
        </div>
      )}
      <main
        className={`${isConfirm && "pointer-events-none blur-xs"} font-poppins mt-[70px] ml-[284px] flex min-h-screen flex-col gap-6 bg-gray-100 p-8`}
      >
        <h1 className="text-primary text-2xl font-semibold">Send a report</h1>
        <div className="flex w-full gap-10">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsConfirm(true);
            }}
            className="relative w-1/2"
          >
            <textarea
              value={message}
              onChange={handleChange}
              name="report"
              className="text-primary max-h-130 min-h-130 max-w-150 min-w-150 rounded-md border-1 border-gray-300 bg-white p-3 font-normal outline-none"
            ></textarea>
            <button className="bg-primary absolute right-1 bottom-7 cursor-pointer rounded-md px-4 py-1 text-white transition-all duration-150 hover:opacity-70">
              Submit<i className="fa-solid fa-file ml-2"></i>
            </button>
          </form>
          <div className="thirdary-yellow-500 text-primary rounded-md border-l-4 bg-white p-6 text-sm shadow">
            <h2 className="mb-2 text-base font-semibold text-green-400">
              <i className="fa-solid fa-clipboard-list mr-2"></i>Report
              Guidelines
            </h2>
            <ul className="mb-2 ml-5 list-disc space-y-1">
              <li>Only report genuine issues like scams, abuse, or bugs.</li>
              <li>Include specific and clear details in your report.</li>
              <li>Avoid submitting duplicate or false reports.</li>
              <li>Disrespectful or misleading submissions will be ignored.</li>
            </ul>

            <div className="mb-2">
              <h3 className="mb-2 font-semibold text-red-500">
                <i className="fa-solid fa-circle-xmark mr-2"></i>What You Should
                NOT Report:
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Personal disputes unrelated to trading on QuickTrade</li>
                <li>
                  Low product quality (unless it's clearly misrepresented)
                </li>
                <li>Duplicate reports already submitted</li>
                <li>Complaints without any details</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-blue-500">
                <i className="fa-solid fa-note-sticky mr-2"></i>Before You
                Submit:
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Clearly explain what happened or your situation</li>
                <li>
                  Provide specific details (e.g., product name, user involved)
                </li>
                <li>Avoid offensive or disrespectful language</li>
                <li>
                  Only submit genuine reports — false reports may lead to
                  penalties
                </li>
              </ul>
            </div>
            <p className="mt-3 font-semibold">
              Your report will be reviewed by our admin team. Abuse of this
              feature may result in penalties.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
