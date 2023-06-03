import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  /* no need to send request to the backend server. Just delete the 
    JWT token from local storage and change the global state 
    of the user by just dispatching logout action */

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    //dispatch logout action (no payload needed)
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
