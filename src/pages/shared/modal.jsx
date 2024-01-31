import React from "react";
import { Helmet } from "react-helmet-async";

// closeModal => function to close the modal
export default function Modal({ closeModal, children }) {
  return (
    <div className="parent-of-modal">
      <Helmet>
        <style type="text/css">
          {`.parent-of-modal {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.5);
            }
            .modal {
            background-color: rgb(255, 255, 255);
            height: 330px;
            width: 370px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            animation: mymove 0.8s ;
            overflow-y: auto;
            }

            @keyframes mymove {
              0% {scale:0;
              transform: translateY(-100vh);
            }
              100% {scale:1;
              transform: translateY(0);
            }
            }`}
        </style>
      </Helmet>
      <form className={`modal`}>
        <div
          onClick={() => {
            closeModal();
          }}
          className="close"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        {children}
      </form>
    </div>
  );
}
