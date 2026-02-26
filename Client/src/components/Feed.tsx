// @ts-nocheck
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL, FEED_ENDPOINT } from "../utils/constant";
import { addFeed, deleteFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => {
    return store.feedReducer.feed;
  });

  const getFeed = async () => {
    const feedResponse = await axios.get(BASE_URL + FEED_ENDPOINT, {
      withCredentials: true,
    });
    const feed = feedResponse.data.data;

    dispatch(addFeed(feed));
  };

  const handleFeed = async (id, status) => {
    const url = `${BASE_URL}/request/send/${status}/${id}`;
    await axios.post(url, {}, { withCredentials: true });

    dispatch(deleteFeed(id));
  };

  useEffect(() => {
    getFeed();
  }, []);

  return feed && feed.length > 0 ? (
    <div className='flex-1 justify-items-center content-center'>
      <UserCard user={feed[0]} userAction={handleFeed} />
    </div>
  ) : (
    <li className='p-4 pb-2 text-xs opacity-60 tracking-wide flex-1'>
      No new users
    </li>
  );
};

export default Feed;
