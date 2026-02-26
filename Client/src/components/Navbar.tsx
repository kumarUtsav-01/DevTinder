// @ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from "../utils/constant";
import axios from "axios";
import { deleteUser } from "../utils/userSlice";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => {
    return store.userReducer.user;
  });

  const handleLogout = async () => {
    const LOGOUT_URL = BASE_URL + LOGOUT_ENDPOINT;

    try {
      await axios.post(LOGOUT_URL, {}, { withCredentials: true });
      dispatch(deleteUser());
      navigate(LOGIN_ENDPOINT);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='navbar bg-base-300 shadow-sm sticky z-1'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          daisyUI
        </Link>
      </div>
      {user && (
        <div className='flex gap-2 items-center'>
          <p>{`Welcome, ${user.firstName}`}</p>
          <div className='dropdown dropdown-end mx-5'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <img
                  alt='Tailwind CSS Navbar component'
                  src={`${user.photoUrl}`}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className='menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/request'>Requests</Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
