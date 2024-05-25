import React, { act, useEffect, useReducer } from "react";
import { useState } from "react";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 3 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 3 };
  }

  return { value: "", isValid: false };
};

const Form = ({ onLoggedIn }) => {
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [emailIsvalid, setEmailIsValid] = useState(false);
  // const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const handleEmail = (e) => {
    // console.log("email", e.target.value);
    // setEmail(e.target.value);
    // setFormIsValid(email.includes("@") && password.length > 3);
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };

  const handlePassword = (e) => {
    // console.log("password", e.target.value);
    // setPassword(e.target.value);
    // setFormIsValid(email.includes("@") && password.length > 3);
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log("form submitted");
    if (
      emailState.value === "admin@gmail.com" &&
      passwordState.value === "admin"
    ) {
      console.log("password matched");
      onLoggedIn();
    } else {
      console.log("password not matched");
    }
  };

  const handleEmailisValid = (e) => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const handlePasswordisValid = (e) => {
    // setPasswordIsValid(e.target.value.trim().length > 3);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(
        // emailState.value.includes("@") && passwordState.trim().length > 3
        // emailState.isValid && passwordState.isValid
        emailIsValid && passwordIsValid
      );
    }, 500);
    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

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
              emailState.isValid
                ? "outline-none border-gray-700 border p-3"
                : "outline-none border-red-700 border p-3"
            }
            onChange={handleEmail}
            onBlur={handleEmailisValid}
            value={emailState.value}
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
              passwordState.isValid
                ? "outline-none border-gray-700 border p-3"
                : "outline-none border-red-700 border p-3"
            }
            onChange={handlePassword}
            onBlur={handlePasswordisValid}
            value={passwordState.value}
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
