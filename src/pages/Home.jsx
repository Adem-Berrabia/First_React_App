import React from "react";
import Header from "../comp/header";
import Footer from "../comp/footer";
import Loading from "../comp/Loading";
import Error404 from "../pages/Error404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <meta name="description" content="HOMEEEEEEEEEEEE" />
        </Helmet>
        <Header />

        <main>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "27px" }} to="/signin">
              SignIn{" "}
            </Link>
            to continue...<span>🧡</span>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          <Header />
          <main>
            <p>
              welcome : {user.displayName}
              <span>🧡</span>
            </p>
          </main>

          <Footer />
        </>
      );
    }
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          <Header />
          <main>
            <p>
              welcome : {user.displayName}
              <span>🧡</span>
            </p>
            <p>We Send You An Email To Verify Your Account</p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send Again
            </button>
          </main>

          <Footer />
        </>
      );
    }
  }
}
