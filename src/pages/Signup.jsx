import React from "react";
import Header from "../comp/header";
import Loading from "../comp/Loading";
import "../index.css";
import { Link } from "react-router-dom";
import Footer from "../comp/footer";
import { Helmet } from "react-helmet-async";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Error404 from '../pages/Error404'

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [username, setusername] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 />;
  }
  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />
          <main>
            <p>We Send You An Email To Verify Your Account</p>
            <button className="delete">Send Again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }
  const SignUpBtn = (eo) => {
    eo.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        // const user = userCredential.user;
        console.log("doneeeeeeeeee");

        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
        });

        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            // Profile updated!
            navigate("/");
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        sethasError(true);

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

  if (!user) {
    return (
      <>
        <Helmet>
          <title>SignUp Page</title>
        </Helmet>
        <Header />
        <main>
          <form action="">
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              Create New Account <span>&#128071;</span>
            </p>

            <input
              onChange={(eo) => {
                setusername(eo.target.value);
              }}
              type="text"
              placeholder="UserName :"
              required
            />

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
            <button
              onClick={(eo) => {
                SignUpBtn(eo);
              }}
            >
              {" "}
              Sign Up
            </button>
            <p className="account">
              Already have an account <Link to="/signin">Sign in </Link>
            </p>
            {hasError && <h6>{firebaseError}</h6>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
}
