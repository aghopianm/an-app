import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/loginSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setUser(null)); // Clear user state
    navigate("/"); // Redirect to login page
  }, [dispatch, navigate]);

  return null; // No UI needed, just handles logout
}

export default Logout;
