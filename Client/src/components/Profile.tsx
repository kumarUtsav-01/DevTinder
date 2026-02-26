import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import { BASE_URL, UPDATE_ENDPOINT } from "../utils/constant";
import axios from "axios";
import Toast from "./Toast";

const Profile = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    gender: "Male",
    age: 0,
    photoUrl: "emptyUrl",
    about: "",
  };
  const user = useSelector((store: any) => store.userReducer.user);
  const [details, setDetails] = useState(initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updateDetails = (detail: Record<string, any>) => {
    setDetails((details: any) => ({ ...details, ...detail }));
  };

  const submitForm = async () => {
    try {
      const url = BASE_URL + UPDATE_ENDPOINT;
      const response = await axios.patch(
        url,
        { ...details },
        { withCredentials: true },
      );
      setMessage(response.data.message);

      const timeout = setTimeout(() => {
        setMessage("");
        clearTimeout(timeout);
      }, 3000);
    } catch (err: any) {
      setError(err?.response?.data);
    }
  };

  useEffect(() => {
    if (user) {
      const { firstName, lastName, gender, age, photoUrl, about } = user;
      setDetails((details) => ({
        ...details,
        firstName,
        lastName,
        gender,
        age,
        photoUrl,
        about,
      }));
    }
  }, [user]);

  return (
    <div className='flex flex-1'>
      {message && <Toast message={message} alertType='success' />}
      <div className='hero bg-base-200'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          {details && <UserCard user={details} />}
          <div className='card bg-base-100 w-96 shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title text-2xl'>Profile</h2>
              <div className='grid grid-cols-2 gap-4'>
                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>First Name</legend>
                  <input
                    type='text'
                    className='input'
                    value={details.firstName}
                    onChange={(e) =>
                      updateDetails({ firstName: e.target.value })
                    }
                  />
                </fieldset>
                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Last Name</legend>
                  <input
                    type='text'
                    className='input'
                    value={details.lastName}
                    onChange={(e) =>
                      updateDetails({ lastName: e.target.value })
                    }
                  />
                </fieldset>
                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Gender</legend>
                  <select
                    defaultValue={details.gender}
                    className='select'
                    onChange={(e) => updateDetails({ gender: e.target.value })}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </fieldset>
                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Age</legend>
                  <input
                    type='number'
                    className='input'
                    value={details.age}
                    onChange={(e) =>
                      updateDetails({ age: e.target.value ?? 0 })
                    }
                  />
                </fieldset>
                <fieldset className='fieldset col-span-2'>
                  <legend className='fieldset-legend'>Photo URL</legend>
                  <input
                    type='text'
                    className='input'
                    value={details.photoUrl}
                    onChange={(e) =>
                      updateDetails({ photoUrl: e.target.value })
                    }
                  />
                </fieldset>
                <fieldset className='fieldset col-span-2'>
                  <legend className='fieldset-legend'>About</legend>
                  <textarea
                    className='textarea'
                    value={details.about}
                    maxLength={100}
                    onChange={(e) => updateDetails({ about: e.target.value })}
                  />
                </fieldset>
                <p className='text-red-500'>{error ?? ""}</p>
              </div>
              <div className='card-actions flex-row-reverse'>
                <button className='btn btn-primary' onClick={submitForm}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
