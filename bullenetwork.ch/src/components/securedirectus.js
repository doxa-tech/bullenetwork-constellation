import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import Layout from "./layout-small"
import { Login } from "./login"
import { navigate } from "gatsby"
import { Buffer } from "buffer";

export const SecureContext = createContext(null);

export const SecureDirectus = ({ children, email, className }) => {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState("");

  const key = Buffer.from(email).toString("base64")

  useEffect(() => {
    const auth_info = JSON.parse(window.localStorage.getItem(key));
    console.log("auth info:", auth_info);
    if (auth_info) {
      setAccessToken(auth_info[0].access_token);
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [])

  useEffect(() => {
    if (accessToken === "") {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [accessToken])

  const handleError = (response) => {

    if (response.errors.length === 0) {
      setError("Empty error, please login.");
      setShowLogin(true);
      return
    }

    if (response.errors[0].extensions.code === "TOKEN_EXPIRED") {
      const auth_info = JSON.parse(window.localStorage.getItem(key));

      if (!auth_info) {
        setError("Please login.")
        setShowLogin(true);
        return
      }

      const data = { refresh_token: auth_info[0].refresh_token, mode: "json" }

      fetch(`${process.env.DIRECTUS_ENDPOINT}/auth/refresh`, {
        method: 'POST', headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((req) => req.json())
        .then((resp) => {
          if (resp.errors) {
            throw "Failed to refresh: " + resp.errors[0].message;
          } else if (resp.data) {
            localStorage.setItem(key, JSON.stringify([resp.data]));
            setAccessToken(resp.data.access_token);
          } else {
            throw "bad response:" + JSON.stringify(resp);
          }
        }).catch((e) => {
          setError(e);
          setShowLogin(true);
          return null
        })
    } else {
      setError("Erreur de login: " + response.errors[0].message);
      setShowLogin(true);
    }
  }

  const logout = () => {
    localStorage.removeItem(key);
    setAccessToken("");
    navigate("/");
  }

  const login = () => {
    setShowLogin(true);
  }

  return (
    <Layout layoutClass={`secondary-layout ${className}`} title="Partition" >
      {showLogin &&
        <Login email={email} setAccessToken={setAccessToken} setShowLogin={setShowLogin} error={error} />
      }
      <SecureContext.Provider value={{ accessToken, handleError, logout, login }}>
        {children}
      </SecureContext.Provider >
    </Layout>
  )
}

export const LogoutIcon = () => {
  const { logout } = useContext(SecureContext);

  return (
    <svg onClick={logout} title="logout" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 384.971 384.971">
      <title>Se déconnecter</title>
      <g>
        <g id="Sign_Out">
          <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"/>
          <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
        </g>
      </g>
    </svg>
  )
}

export const LoginIcon = () => {
  const { login } = useContext(SecureContext);

  return (
    <svg className="login" onClick={login} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 330 330">
      <title>Se connecter</title>
      <g>
        <path d="M305,149.998H121.215l44.392-44.392c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.858-15.355-5.858-21.213,0l-69.998,69.998
		c-5.858,5.857-5.858,15.355,0,21.213l69.998,70.002c2.929,2.929,6.767,4.394,10.606,4.394c3.838-0.001,7.678-1.465,10.606-4.393
		c5.857-5.858,5.858-15.355,0-21.213l-44.394-44.396H305c8.284,0,15-6.716,15-15C320,156.714,313.284,149.998,305,149.998z"/>
        <path d="M155,300H40V30h115c8.284,0,15-6.716,15-15s-6.716-15-15-15H25c-8.284,0-15,6.716-15,15v300c0,8.284,6.716,15,15,15h130
		c8.284,0,15-6.716,15-15S163.284,300,155,300z"/>
      </g>
    </svg>
  )
}