import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { AppDispatch } from "../store";

function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    // Use the logout action instead of setUser(null)
    dispatch(logout());
    
    // Redirect to login page
    navigate("/");
  }, [dispatch, navigate]);

  // No UI needed, just handles logout
  return null;
}

export default Logout;