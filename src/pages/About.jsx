import React from "react";
import Header from "../comp/header";
import Footer from "../comp/footer";
import Loading from "../comp/Loading";
import Error404 from '../pages/Error404'

import MainContetnt from "../comp/mainContetnt";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

export default function About() {
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
    return <Error404 />;
  }
  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>About Page</title>
          </Helmet>
          <Header />
          <MainContetnt PageName="About Page" />
          <Footer />
        </>
      );
    }
  }
}
