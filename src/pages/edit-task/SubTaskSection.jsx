import { db } from "../../firebase/config";
import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Moment from "react-moment";

export default function SubTaskSection({
  user,
  StringId,
  completedCheckBox,
  trashIcon,
}) {
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [value, loading, error] = useDocument(doc(db, user.uid, StringId));
  const [subTitle, setsubTitle] = useState("");
  if (value) {
    return (
      <section className="sub-task mt">
        <div className="parent-time">
          <p className="time">
            Created : <Moment fromNow date={value.data().StringId} />
          </p>
          <div>
            <input
              onChange={async (eo) => {
                completedCheckBox(eo);
              }}
              checked={value.data().completed}
              type="checkbox"
              id="checkbox"
            />
            <label htmlFor="checkbox">completed</label>
          </div>
        </div>
        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p>{item}</p>
                <i
                  onClick={() => {
                    trashIcon(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>

        {showAddNewTask && (
          <form style={{ flexDirection: "row" }} className="add-new-task flex">
            <input
              value={subTitle}
              onChange={(eo) => {
                setsubTitle(eo.target.value);
              }}
              type="text"
              className="add-task"
            />
            <button
              className="add"
              onClick={async (eo) => {
                eo.preventDefault();
                setsubTitle("");
                await updateDoc(doc(db, user.uid, StringId), {
                  details: arrayUnion(subTitle),
                });
              }}
            >
              Add
            </button>
            <button
              className="cancel"
              onClick={(eo) => {
                eo.preventDefault();
                setshowAddNewTask(false);
              }}
            >
              Cancel
            </button>
          </form>
        )}
        <div className="center mtt">
          <button
            onClick={(eo) => {
              setshowAddNewTask(true);
            }}
            className="add-more-btn"
          >
            Add More <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
}
