import React from "react";

export default function BTNSection({deleteBtn}) {
  return (
    <section className="center mt">
      <div>
        <button onClick={() => {
            deleteBtn()
        }} className="delete">Delete Task</button>
      </div>
    </section>
  );
}
