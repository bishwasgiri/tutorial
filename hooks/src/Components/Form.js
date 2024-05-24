import React, { useEffect } from "react";
import { useState } from "react";

const Form = ({ onLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsvalid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const handleEmail = (e) => {
    // console.log("email", e.target.value);
    setEmail(e.target.value);
    // setFormIsValid(email.includes("@") && password.length > 3);
  };

  const handlePassword = (e) => {
    // console.log("password", e.target.value);
    setPassword(e.target.value);
    // setFormIsValid(email.includes("@") && password.length > 3);
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log("form submitted");
    if (email === "admin@gmail.com" && password === "admin") {
      console.log("password matched");
      onLoggedIn();
    } else {
      console.log("password not matched");
    }
  };

  const handleEmailisValid = (e) => {
    setEmailIsValid(e.target.value.includes("@"));
  };

  const handlePasswordisValid = (e) => {
    setPasswordIsValid(e.target.value.trim().length > 3);
  };

  // const {email} =

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(email.includes("@") && password.trim().length > 3);
    }, 500);
    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [email, password]);

  return (
    <div className="w-3/5 mx-auto  flex flex-col items-center mt-20  p-3 ">
      <form
        onSubmit={handleForm}
        className="flex flex-col items-start space-y-5 border-2  rounded p-10 shadow-lg"
      >
        <div className="flex flex-col items-start space-y-2  ">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="enter email"
            id="email"
            className={
              emailIsvalid
                ? "outline-none border-gray-700 border p-3"
                : "outline-none border-red-700 border p-3"
            }
            onChange={handleEmail}
            onBlur={handleEmailisValid}
            value={email}
          />
        </div>

        {/* {console.log(emailIsvalid)} */}

        <div className="flex flex-col items-start space-y-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder=" enter password"
            id="password"
            className={
              passwordIsValid
                ? "outline-none border-gray-700 border p-3"
                : "outline-none border-red-700 border p-3"
            }
            onChange={handlePassword}
            onBlur={handlePasswordisValid}
            value={password}
          />
        </div>
        <div>
          <button
            type="submit"
            className={
              formIsValid
                ? "bg-blue-300 text-white rounded p-4"
                : "bg-red-300 text-white rounded p-4"
            }
            disabled={!formIsValid}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
