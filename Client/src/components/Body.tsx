// @ts-nocheck
import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

export const Body = () => {
  const user = useSelector((store) => store.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    if (!user) {
      const profileURL = BASE_URL + "/profile/view";
      const currentURL = new URL(window.location.href);
      console.log(currentURL.pathname);

      try {
        const res = await axios.get(profileURL, { withCredentials: true });
        dispatch(addUser(res.data));
      } catch (err: any) {
        if (
          err?.response?.status === 401 &&
          currentURL.pathname !== "/signup"
        ) {
          navigate("/login");
        }
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [user, dispatch, navigate]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
