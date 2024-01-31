import { db } from "../../firebase/config";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import React, { useRef } from "react";
import ReactLoading from "react-loading";

export default function TitleSection({ user, StringId, titleInput }) {
  const inputElement = useRef(null);
  const [value, loading, error] = useDocument(doc(db, user.uid, StringId));
  if (loading) {
    return (
      <main>
        {" "}
        <ReactLoading type={"spin"} color={"white"} height={200} width={100} />
      </main>
    );
  }
  if (error) {
    <main>
      <h1>Error : {error.message}</h1>
    </main>;
  }
  if (value) {
    return (
      <section className="title center mt">
        <h1>
          <input
            style={{ textDecoration: value.data().completed ? "line-through wavy red" : null }}
            onChange={async (eo) => {
              titleInput(eo);
            }}
            defaultValue={value.data().title}
            className="title-input center"
            type="text"
            ref={inputElement}
          />
          <i
            onClick={() => {
              inputElement.current.focus();
            }}
            className="fa-regular fa-pen-to-square"
          ></i>
        </h1>
      </section>
    );
  }
}
