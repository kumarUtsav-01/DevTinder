import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async () => {
    const signUpURL = BASE_URL + "/signup";

    try {
      const response = await axios.post(
        signUpURL,
        { firstName, lastName, email, password },
        { withCredentials: true },
      );

      dispatch(addUser(response.data.data));
      navigate("/profile");
    } catch (err: any) {
      setError(err?.response?.data || "Something went wrong!!");
    }
  };

  return (
    <div className='flex-1'>
      <div className='card card-border bg-base-300 w-96 justify-self-center mt-5'>
        <div className='card-body'>
          <h2 className='card-title justify-center text-2xl'>Sign Up</h2>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>First Name</legend>
            <input
              type='text'
              className='input'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Last Name</legend>
            <input
              type='text'
              className='input'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Email Address</legend>
            <input
              type='text'
              className='input'
              value={email}
              onChange={(e) => setemail(e.target.value)}
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
              Sign Up
            </button>
          </div>
          <a href='/login' className='m-auto'>
            Existing User? Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
