const jwtKey = 'task-app-jwt';
// This function will set the JWT in local storage
// It takes a JWT as an argument
// It sets the JWT in local storage under the key 'task-app-jwt'
// the string 'task-app-jwt' is the key that we will use to store the JWT in local storage and it can be anything you want
export const setJwt = (jwt) => {
  localStorage.setItem(jwtKey, jwt);
}

export const getJwt = () => {
  const jwt = localStorage.getItem(jwtKey);
  return jwt;
}

export const removeJwt = () => {
  localStorage.removeItem(jwtKey);
}
