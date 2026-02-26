import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, deleteUser } from "../utils/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant.ts";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    dispatch(deleteUser(null));
  }, []);

  const submitForm = async () => {
    const LOGIN_URL = BASE_URL + "/login";

    try {
      const user = await axios.post(
        LOGIN_URL,
        {
          email: emailId,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(user.data));
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data || "Something went wrong!!");
    }
  };

  return (
    <div className='flex-1'>
      <div className='card card-border bg-base-300 w-96 justify-self-center mt-5'>
        <div className='card-body'>
          <h2 className='card-title justify-center text-2xl'>Login</h2>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Email Address</legend>
            <input
              type='text'
              className='input'
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Password</legend>
            <input
              type='password'
              className='input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className='text-red-500'>{error ?? ""}</p>
          <div className='card-actions justify-center mt-5'>
            <button className='btn btn-primary' onClick={submitForm}>
              Login
            </button>
          </div>
          <a href='/signup' className='m-auto'>
            New user? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
