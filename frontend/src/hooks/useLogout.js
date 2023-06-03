import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  /* no need to send request to the backend server. Just delete the 
    JWT token from local storage and change the global state 
    of the user by just dispatching logout action */

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    //dispatch logout action (no payload needed)
    dispatch({ type: "LOGOUT" });

    //clear the workout global context
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
