import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Photos from "./Photos";
import { getUserPhotos } from "../../services/firebase";

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: [],
  photosCollection: null,
  followersLength: 0,
};

const UserProfile = ({ userInfo }) => {
  const [{ profile, photosCollection, followersLength }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getPhotos = async () => {
      const userPhotos = await getUserPhotos(userInfo.userId);
      dispatch({
        profile: userInfo,
        photosCollection: userPhotos,
        followersLength: userInfo.followers.length,
      });
    };
    if (userInfo?.userId) {
      getPhotos();
    }
  }, [userInfo]);

  return (
    <div className="w-full">
      <Header
        profile={profile}
        photosCollection={photosCollection ? photosCollection : 0}
        followersLength={followersLength}
        setFollowCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </div>
  );
};

export default UserProfile;
