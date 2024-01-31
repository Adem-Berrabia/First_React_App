import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, ToggleTheme } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  return (
    <div className="myheader">
      <header className="hide-when-mobile adem">
        <h1>
          <Link className="logo" to="/">
            Task Management
          </Link>
        </h1>
        <i
          onClick={() => ToggleTheme(theme === "Light" ? "Dark" : "Light")}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => ToggleTheme(theme === "Light" ? "Dark" : "Light")}
          className="fa-solid fa-sun"
        ></i>
        <ul className="flex">
          <li className="main-list lang">
            {t("lang")}
            <ul className="lang-box">
              <li
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                <p>English</p>
                {i18n.language === "en" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("fr");
                }}
              >
                <p>French</p>
                {i18n.language === "fr" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
              >
                <p>Arabic</p>
                {i18n.language === "ar" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
            </ul>
          </li>

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                {t("signin")}
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                {t("signup")}
              </NavLink>
            </li>
          )}
          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Sign-out successful");
                  })
                  .catch((error) => {
                    console.log("An error happened");
                  });
              }}
              className="main-list"
            >
              <button className="main-link signout">{t("signout")}</button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/About">
                {t("support")}
              </NavLink>
            </li>
          )}
          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Profile">
                {t("account")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>

      {/* <header className="show-when-mobile">
        <h1>
          <Link to="/">Adem Berrabia</Link>
        </h1>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars" />
        </label>
        <input id="burger" type="checkbox" />
        <div className="show-on-click">
          <div className="main-div">
            <label htmlFor="html">
              HTML <i className="fas fa-plus" />
            </label>
            <input id="html" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/html">Full Course</NavLink>
              </li>
              <li>
                <NavLink to="/html">Crash Course</NavLink>
              </li>
              <li>
                <NavLink to="/html">learn in 1h</NavLink>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="css">
              CSS <i className="fas fa-plus" />
            </label>
            <input id="css" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/css">Full Course</NavLink>
              </li>
              <li>
                <NavLink to="/css">CSS Examples</NavLink>
              </li>
              <li>
                <label className="mini-projects" htmlFor="mini">
                  mini projects <i className="fas fa-plus" />
                </label>
                <input id="mini" type="checkbox" />
                <ul className="sub-sub-div">
                  <li>
                    <Link to="">project 1</Link>
                  </li>
                  <li>
                    <Link to="">project 2</Link>
                  </li>
                  <li>
                    <Link to="">project 3</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="js">
              JavaScript <i className="fas fa-plus" />
            </label>
            <input id="js" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink to="/javascript">coming soon🔥</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header> */}
    </div>
  );
}
