import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import "./Home.css";
import Header from "../../comp/header";
import Footer from "../../comp/footer";
import Loading from "../../comp/Loading";
import Error404 from "../Error404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import HomeModal from "./HomeModal";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { i18n } = useTranslation();

  const [user, loading, error] = useAuthState(auth);
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  // ===============================
  //    FUNCTIONS of Modal
  // ===============================
  const [showMessage, setshowMessage] = useState(false);
  const [showLoading, setshowLoading] = useState(false);
  const [taskTitle, settaskTitle] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [showModal, setshowModal] = useState(false);

  const closeModal = () => {
    setshowModal(false);
    setarray([]);
    setsubTask("");
    settaskTitle("");
  };

  const addBtn = (eo) => {
    eo.preventDefault();
    if (!array.includes(subTask)) {
      array.push(subTask);
    }
    setsubTask("");
  };

  const detailsInput = (eo) => {
    setsubTask(eo.target.value);
  };

  const titleInput = (eo) => {
    settaskTitle(eo.target.value);
  };

  const submitBTN = async (eo) => {
    eo.preventDefault();
    console.log("wait...........");
    setshowLoading(true);
    const taskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: taskTitle,
      details: array,
      id: taskId,
      completed: false,
    });
    console.log("donnnnnne");
    setshowLoading(false);
    settaskTitle("");
    setarray([]);
    setshowModal(false);
    setshowMessage(true);
    setTimeout(() => {
      setshowMessage(false);
    }, 2500);
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
          {i18n.language === "en" && (
            <p className="pls">
              Please{" "}
              <Link style={{ fontSize: "30px" }} to="/signin">
                sign in
              </Link>{" "}
              to continue...{" "}
              <span>🧡</span>
            </p>
          )}

          {i18n.language === "ar" && (
            <p dir="rtl" className="pls mt">
              من فضلك قم ب
              <Link style={{ fontSize: "30px" }} to="/signin">
                {" "}
                تسجيل الدخول{" "}
              </Link>{" "}
              للإستمرار{" "}
              <span>🧡</span>
            </p>
          )}

          {i18n.language === "fr" && (
            <p className="pls mt">
              Veuillez
              <Link style={{ fontSize: "30px" }} to="/signin">
                {" "}
                vous connecter{" "}
              </Link>{" "}
              pour continuer{" "}
              <span>🧡</span>
            </p>
          )}

          
        </main>
        <Footer />
      </>
    );
  }

  if (user) {
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
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>
          <Header />

          <main className="home">
            {/* OPTIONS */}

            {/* SHOW ALL DATA */}
            <AllTasksSection user={user} />
            {/* ADD NEW TASK BTN */}
            <section className="mt">
              <button
                dir="auto"
                className="add-task-btn"
                onClick={() => {
                  setshowModal(true);
                }}
              >
                {i18n.language === "fr" && "Ajouter une nouvelle tache"}
                {i18n.language === "en" && "Add new Task"}
                {i18n.language === "ar" && "اضف مهمة جديدة"}{" "}
                <i className="fa-solid fa-plus"></i>
              </button>
            </section>
            {showModal && (
              <HomeModal
                closeModal={closeModal}
                addBtn={addBtn}
                detailsInput={detailsInput}
                titleInput={titleInput}
                submitBTN={submitBTN}
                taskTitle={taskTitle}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}
            <p
              style={{ right: showMessage ? "20px" : "-100vw" }}
              className="show-msg"
            >
              Task Added Successfuly
              <i className="fa-regular fa-circle-check"></i>
            </p>
          </main>
          <Footer />
        </>
      );
    }
  }
}
