import Constants from "../../constants";

// return the user data from the session storage
export const getUser = () => {
    const userStr = localStorage.getItem(Constants.StorageKeys.USER_INFO);
    if (userStr) return JSON.parse(userStr);
    else return null;
};

// return the token from the session storage
export const getToken = () => {
    return localStorage.getItem(Constants.StorageKeys.ACCESS_TOKEN) || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
    localStorage.removeItem(Constants.StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(Constants.StorageKeys.USER_INFO);
};
// set the token and user from the session storage
export const setUserSession = (token, user) => {
    localStorage.setItem(Constants.StorageKeys.ACCESS_TOKEN, token);
    localStorage.setItem(Constants.StorageKeys.USER_INFO, JSON.stringify(user));
};
