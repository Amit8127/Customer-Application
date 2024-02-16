// isLoggedIn
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};

// doLogedIn
export const doLogedIn = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

// doLogOut
export const doLogOut = () => {
  localStorage.removeItem("data");
};

// getCurrentAdmin
export const getCurrentAdmin = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).username;
  } else {
    return "Not logged in";
  }
};

// getJwtToken
export const getJwtToken = () => {
  return JSON.parse(localStorage.getItem("data")).jwtToken;
};
