import React from "react";
import "./footer.css";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { i18n } = useTranslation();

  if (i18n.language === "en") {
    return (
      <div className="myfooter">
        <footer className="adem">
          Designed and developed by Adem Berrabia
          <span>🧡</span>
        </footer>
      </div>
    );
  }
  if (i18n.language === "fr") {
    return (
      <div className="myfooter">
        <footer className="adem">
          Concu et dévéloppé par Adem Berrabia
          <span>🧡</span>
        </footer>
      </div>
    );
  }
  if (i18n.language === "ar") {
    return (
      <div className="myfooter">
        <footer dir="rtl" className="adem">
          تم التصميم و البرمجة بواسطة آدم بالربيع
          <span>🧡</span>
        </footer>
      </div>
    );
  }
}
