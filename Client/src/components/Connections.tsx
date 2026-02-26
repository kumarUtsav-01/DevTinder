// @ts-nocheck
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => {
    return store.connectionReducer.connections;
  });

  const getConnections = async () => {
    const response = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });

    console.log(response.data);
    const connections = response.data.data;
    dispatch(addConnections(connections));
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <ul className='list bg-base-100 rounded-box shadow-md flex-1'>
      <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>Connections</li>

      {connections
        ? connections.map((connection, index) => (
            <li className='list-row' key={`connection-${index}`}>
              <div>
                <img
                  className='size-10 rounded-full'
                  src={connection.photoUrl}
                />
              </div>
              <div>
                <div>{`${connection.firstName} ${connection.lastName}`}</div>
                <div className='text-xs uppercase font-semibold opacity-60'>
                  {`${connection.age}, ${connection.gender}`}
                </div>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
};

export default Connections;
