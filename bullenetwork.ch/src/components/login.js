import React, { useState } from "react"
import Spinner from "./spinner";
import * as styles from "./login.module.scss"
import { navigate } from "gatsby";
import { Buffer } from "buffer";

export const Login = ({ email, setAccessToken, setShowLogin, error }) => {

  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(error);
  const [loading, setLoading] = useState(false);

  const key = Buffer.from(email).toString("base64")

  const login = () => {
    if (password == "") {
      setLocalError("Mot de passe vide.");
      return
    }

    setLocalError("");
    setLoading(true);

    const data = { "email": email, "password": password }

    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/auth/login`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((req) => req.json()).
      then((resp) => {
        if (resp.data != undefined) {
          localStorage.setItem(key, JSON.stringify([resp.data]));
          setAccessToken(resp.data.access_token);
          setShowLogin(false);
        } else if (resp.errors) {
          setLocalError(resp.errors[0].message);
        }
      }).finally(() => {
        setLoading(false);
      })
  }

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      login();
    }
  }

  const btnClick = (e) => {
    setShowLogin(false);
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.sectionContainer}>
        <div className={styles.subContainer}>
          <button onClick={btnClick} className={styles.close}>x</button>
          <h1>Identification</h1>
          <div className={styles.form}>
            <input type="password" placeholder="Mot de passe" id="login" onKeyPress={onKeyPress} onInput={(e) => { setPassword(e.target.value) }} />
            <input type="submit" value="login" onClick={login} />
            {loading && <div className={styles.spinner}><div style={{ width: "80px", height: "80px" }}><Spinner scale="1" /></div></div>}
          </div>
          {localError != "" && <div className={styles.error}>{localError}</div>}
          <div className={styles.back}>
            <button onClick={() => navigate("/")}>← Retours sur l'accueil</button>
          </div>
        </div>
      </div>
    </div >
  )
}