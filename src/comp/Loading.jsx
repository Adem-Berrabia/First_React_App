import React from "react";
import Header from "./header";
import Footer from "./footer";
import  "./Loading.css";
export default function Loading() {
  return (
    <div>
      <Header />
      <main>
        <h2>
          <div className="page_loading"></div>
        </h2>
      </main>
      <Footer />
    </div>
  );
}
