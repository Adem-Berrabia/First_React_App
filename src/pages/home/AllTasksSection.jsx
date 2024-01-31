import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

export default function AllTasksSection({ user }) {
  const { i18n } = useTranslation();

  const [initialData, setinitialData] = useState(
    query(collection(db, user.uid), orderBy("id"))
  );

  const [isFullOpacity, setisFullOpacity] = useState(false);
  const [selectValue, setselectValue] = useState("aaa");

  const [value, loading, error] = useCollection(initialData);
  if (error) {
    <h1>ERROR : {error.message}</h1>;
  }
  if (loading) {
    <section className="mtt">
      <ReactLoading type={"spin"} color={"white"} height={77} width={77} />;
    </section>;
  }
  if (value) {
    return (
      <div>
        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btns flex mt"
        >
          {selectValue === "aaa" && (
            <div>
              <button
                style={{
                  cursor: "pointer",
                  opacity: isFullOpacity ? "1" : "0.3",
                }}
                onClick={() => {
                  setisFullOpacity(true);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                }}
              >
                {i18n.language === "fr" && "Le plus récent"}
                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الاحدث اولا"}
              </button>
              <button
                style={{
                  cursor: "pointer",
                  opacity: isFullOpacity ? "0.3" : "1",
                }}
                onClick={() => {
                  setisFullOpacity(false);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "asc"))
                  );
                }}
              >
                {i18n.language === "fr" && "Le plus ancien"}
                {i18n.language === "en" && "Oldest first"}
                {i18n.language === "ar" && " الاقدم اولا"}
              </button>
            </div>
          )}
          <select
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "aaa") {
                setselectValue("aaa");
                setinitialData(query(collection(db, user.uid), orderBy("id")));
              } else if (eo.target.value === "bbb") {
                setselectValue("bbb");
                setinitialData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", true)
                  )
                );
              } else if (eo.target.value === "ccc") {
                setselectValue("ccc");

                setinitialData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", false)
                  )
                );
              }
            }}
          >
            <option value="aaa">
              {i18n.language === "fr" && "Tous les taches"}
              {i18n.language === "en" && "All Tasks"}
              {i18n.language === "ar" && "جميع المهام"}
            </option>
            <option value="bbb">
              {i18n.language === "fr" && "Taches terminées"}
              {i18n.language === "en" && "Completed Task"}
              {i18n.language === "ar" && " المهام المكتملة"}
            </option>
            <option value="ccc">
              {i18n.language === "fr" && "Taches non terminées"}
              {i18n.language === "en" && "Not completed Task"}
              {i18n.language === "ar" && " المهام غير المكتملة"}
            </option>
          </select>
        </section>
        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <h1>
              Congratulation ! You Have Completed Your Tasks<span>🧡</span>
            </h1>
          )}

          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link className="task-link" to={`/editTask/${item.data().id}`}>
                  <h2>{item.data().title}</h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}>{item}</li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>
                  <p className="time1">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
}
