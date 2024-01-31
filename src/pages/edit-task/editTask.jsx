import { Helmet } from "react-helmet-async";
import "./editTask.css";
import React, { useState } from "react";
import Header from "../../comp/header";
import Footer from "../../comp/footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Loading from "comp/Loading";
import TitleSection from "./TitleSection";
import SubTaskSection from "./SubTaskSection";
import BTNSection from "./BTNSection";
import { useParams } from "react-router-dom";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function EditTask() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  let { StringId } = useParams();

  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, StringId), {
      title: eo.target.value,
    });
  };

  const completedCheckBox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, StringId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, StringId), {
        completed: false,
      });
    }
  };
  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, StringId), {
      details: arrayRemove(item),
    });
  };
  const [showData, setshowData] = useState(false);
  const deleteBtn = async () => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, StringId));
    navigate("/", { replace: true });
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <h1>Error:{error.message}</h1>;
  }
  if (user) {
    return (
      <div>
        <Helmet>
          <title>Edit Task Page</title>
        </Helmet>
        <Header />
        {showData ? (
          <main>
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={77}
              width={77}
            />
          </main>
        ) : (
          <div className="edit-task">
            {/* title */}
            <TitleSection
              user={user}
              StringId={StringId}
              titleInput={titleInput}
            />
            {/* sub-tasks section */}
            <SubTaskSection
              user={user}
              StringId={StringId}
              completedCheckBox={completedCheckBox}
              trashIcon={trashIcon}
            />
            {/* add more btn && delete btn*/}
            <BTNSection deleteBtn={deleteBtn} />
          </div>
        )}

        <Footer />
      </div>
    );
  }
}
