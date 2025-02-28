import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { RootState, AppDispatch } from "../store";

function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(logout()); // Dispatch logout action

    // Redirect only AFTER state updates
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [dispatch, isLoggedIn, navigate]);

  return null;
}

export default Logout;
