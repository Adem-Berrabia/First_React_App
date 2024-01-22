import React from "react";
import { useEffect } from "react";
import Header from "../comp/header";
import Footer from "../comp/footer";
import Loading from "../comp/Loading";
import Moment from "react-moment";
// import MainContetnt from "../comp/mainContetnt";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { deleteUser } from "firebase/auth";
export default function Profile() {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  const DeleteBtn = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
        console.log("User deleted.");
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };
  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile Page</title>
          <style type="text/css">{`
          main{
            flex-direction:column;
            width:fit-content ;
            margin-right: auto;
            margin-left: auto;
            align-items:flex-start;
            
          }
          
          `}</style>
        </Helmet>
        <Header />
        <main>
          <h6>Email : {user.email}</h6>
          <h6>UserName : {user.displayName}</h6>
          <h6>
            Last SignIn : <Moment fromNow date={user.metadata.lastSignInTime} />
          </h6>
          <h6>
            Account Created :{" "}
            <Moment fromNow date={user.metadata.creationTime} />
          </h6>

          <button
            onClick={() => {
              DeleteBtn();
            }}
            className="delete"
          >
            Delete Account
          </button>
        </main>

        <Footer />
      </>
    );
  }
}
