// @ts-nocheck
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requestReducer.requests);

  const getRequests = async () => {
    const requestURL = BASE_URL + "/user/requests/retrieved";
    const requests = await axios.get(requestURL, { withCredentials: true });

    dispatch(addRequests(requests.data.data));
  };

  const handleRequest = async (status, request_id) => {
    const url = BASE_URL + `/request/review/${status}/${request_id}`;

    try {
      await axios.post(url, {}, { withCredentials: true });
      dispatch(removeRequest(request_id));
    } catch (err) {
      // error when request failed
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <ul className='list bg-base-100 rounded-box shadow-md flex-1'>
      <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>Requests</li>
      {requests.length > 0 ? (
        requests.map(({ _id, fromUserId }) => (
          <li key={_id} className='list-row flex items-center'>
            <div>
              <img className='size-10 rounded-box' src={fromUserId.photoUrl} />
            </div>
            <div className='flex-1'>
              <div>{`${fromUserId.firstName} ${fromUserId.lastName}`}</div>
              <div className='text-xs uppercase font-semibold opacity-60'>
                {`${fromUserId.age}, ${fromUserId.gender}`}
              </div>
              <p className='list-col-wrap text-xs'>{fromUserId.about}</p>
            </div>
            <button
              className='btn btn-square btn-ghost'
              onClick={() => handleRequest("rejected", _id)}
            >
              <svg
                className='size-[1.2em]'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <g
                  strokeLinejoin='round'
                  strokeLinecap='round'
                  strokeWidth='2'
                  fill='none'
                  stroke='currentColor'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </g>
              </svg>
            </button>
            <button
              className='btn btn-square btn-ghost'
              onClick={() => handleRequest("accepted", _id)}
            >
              <svg
                className='size-[1.2em]'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <g
                  strokeLinejoin='round'
                  strokeLinecap='round'
                  strokeWidth='2'
                  fill='none'
                  stroke='currentColor'
                >
                  <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'></path>
                </g>
              </svg>
            </button>
          </li>
        ))
      ) : (
        <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>
          No requests
        </li>
      )}
    </ul>
  );
};

export default Requests;
