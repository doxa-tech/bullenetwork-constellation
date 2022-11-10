const handleError = (response) => {

  if (response.errors.length === 0) {
    setError("Empty error, please login.");
    setShowLogin(true);
    return
  }

  if (response.errors[0].extensions.code === "TOKEN_EXPIRED") {
    const auth_info = JSON.parse(window.localStorage.getItem(`bn_auth_partitions`));

    if (!auth_info) {
      setError("Please login.")
      setShowLogin(true);
      return
    }

    const data = { refresh_token: auth_info[0].refresh_token, mode: "json" }

    fetch("https://vanil.bullenetwork.ch/auth/refresh", {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((req) => req.json())
      .then((resp) => {
        if (resp.errors) {
          throw "Failed to refresh:" + resp.errors[0].message;
        } else if (resp.data) {
          localStorage.setItem(`bn_auth_partitions`, JSON.stringify([resp.data]));
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