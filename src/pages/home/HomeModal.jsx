import Modal from "pages/shared/modal";
import React from "react";
import ReactLoading from "react-loading";

export default function HomeModal({
  closeModal,
  addBtn,
  detailsInput,
  titleInput,
  submitBTN,
  taskTitle,
  subTask,
  array,
  showLoading,
}) {
  return (
    <Modal closeModal={closeModal}>
      <div className="modal-content">
        <input
          onChange={(eo) => {
            titleInput(eo);
          }}
          type="text"
          placeholder="Add title :"
          required
          value={taskTitle}
        />
        <div>
          <input
            onChange={(eo) => {
              detailsInput(eo);
            }}
            type="text"
            placeholder="Details :"
            value={subTask}
          />
          <button
            style={{ marginLeft: "10px" }}
            onClick={(eo) => {
              addBtn(eo);
            }}
          >
            Add
          </button>
        </div>
        <ul>
          {array.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          onClick={async (eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={20}
              width={20}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Modal>
  );
}
