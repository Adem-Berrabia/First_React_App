import React from "react";
import Header from "../comp/header";
import Footer from "../comp/footer";
import "../index.css";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

export default function SignIn() {
  const [email, setemail] = useState("");
  const [resetPassword, setresetPassword] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [showSendEmail, setshowSendEmail] = useState(false);
  const [showForm, setshowForm] = useState("");

  const navigate = useNavigate();
  const signinBtn = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in successful");
        // const user = userCredential.user;
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("Eroor in Signed In");
        sethasError(true);
        setfirebaseError(errorCode);

        // if (errorCode === "auth/invalid-email") {
        //   setfirebaseError("Wrong Email");
        // } else if (errorCode === "auth/invalid-credential") {
        //   setfirebaseError("Indefined Email");
        // } else {
        // } else if (errorCode === "auth/too-many-requests") {
        //   setfirebaseError("Indefined Email");
        // } else {
        // } else if (errorCode === "auth/missing-password") {
        //   setfirebaseError("Missing Password");
        // } else {
        //   setfirebaseError(errorCode);
        // }
        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;
          case "auth/invalid-credential":
            setfirebaseError("Indefined Email");
            break;
          case "auth/too-many-requests":
            setfirebaseError("Indefined Email");
            break;
          case "auth/missing-password":
            setfirebaseError("Missing Password");
            break;

          default:
            setfirebaseError(errorCode);
            break;
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>SignIn Page</title>
      </Helmet>
      <Header />
      <main>
        <form className={`forget_pass ${showForm}`}>
          <div
            onClick={() => {
              setshowForm("");
            }}
            className="close"
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          <input
            onChange={(eo) => {
              setresetPassword(eo.target.value);
            }}
            type="email"
            placeholder="Email :"
            required
          />
          <button
            onClick={(eo) => {
              eo.preventDefault();

              sendPasswordResetEmail(auth, resetPassword)
                .then(() => {
                  // Password reset email sent!
                  setshowSendEmail(true);
                })
                .catch((error) => {
                  // const errorCode = error.code;
                  // const errorMessage = error.message;
                  // ..
                });
            }}
          >
            Reset Password
          </button>
          {showSendEmail && (
            <p className="check_email">
              Please check you remail to reset your password
            </p>
          )}
        </form>

        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            type="email"
            placeholder="Email :"
            required
          />
          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            type="password"
            placeholder="Password :"
            required
          />
          <button onClick={(eo) => {signinBtn(eo)}}> Sign In</button>
          <p className="account">
            Don't have an account ? <Link to="/signup">SignUp</Link>
          </p>
          <p
            onClick={() => {
              setshowForm("show_forget_pass ");
            }}
            className="line_forget_pass"
          >
            Forget Password ?
          </p>
          {hasError && <h6>{firebaseError}</h6>}
        </form>
      </main>
      <Footer />
    </>
  );
}
