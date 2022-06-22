import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/user-info";
import { ImCancelCircle } from "react-icons/im";
import {
  isLoggedInFollowing,
  toggleFollow,
  getFollowingUsers,
} from "../../services/firebase";
const Header = ({
  profile,
  photosCollection,
  followersLength,
  setFollowCount,
}) => {
  const [isFollowingProfile, setIsFollowingProfie] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followingUsers, setFollowingUsers] = useState([]);
  const { user } = useUser();
  const followBtn = user.username && user.username !== profile.username;

  const displayFollowing = async () => {
    setShowFollowing(true);
    if (profile.following.length > 0) {
      const res = await getFollowingUsers(profile.following);
      setFollowingUsers(res);
    } else {
      setFollowingUsers([]);
    }
  };

  const handleToggleFollow = async () => {
    setIsFollowingProfie(!isFollowingProfile);
    setFollowCount({
      followersLength: isFollowingProfile
        ? followersLength - 1
        : followersLength + 1,
    });
    await toggleFollow(
      user.userId,
      user.docId,
      profile.userId,
      profile.docId,
      isFollowingProfile
    );
  };
  useEffect(() => {
    const isLoggedInUserFollowing = async () => {
      const isFollowing = await isLoggedInFollowing(
        user.userId,
        profile.userId
      );
      setIsFollowingProfie(isFollowing);
    };
    if (user.userId && profile.userId) {
      isLoggedInUserFollowing();
    }
  }, [user.userId, profile.userId]);
  return (
    <header className="w-full grid grid-cols-3 mt-4">
      <div className="w-[5rem] md:w-[8rem]">
        {profile.username ? (
          <img
            className="w-full rounded-full"
            src={`/images/avatars/${profile.username}.jpg`}
            alt={`${profile.username} profile`}
          />
        ) : (
          <Skeleton circle count={1} height={150} width={150} />
        )}
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex space-x-4">
            <p className="cursor-pointer">{profile.username}</p>
            {followBtn ? (
              <button
                onClick={handleToggleFollow}
                className="bg-[#458eff] p-1 rounded text-white"
              >
                {isFollowingProfile ? "unfollow" : "follow"}
              </button>
            ) : null}
          </div>
          {profile.followers === undefined ||
          profile.following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <div className="flex mt-4 space-x-4 container">
              <p className="cursor-pointer">
                <span>{photosCollection.length} photos</span>
              </p>
              <p className="cursor-pointer">
                <span>{followersLength} followers</span>
              </p>
              <p onClick={displayFollowing} className="cursor-pointer">
                <span>{profile.following.length} following</span>
              </p>
            </div>
          )}
          <div className="container mt-4">
            <p className="font-medium">
              {!profile.fullName ? (
                <Skeleton count={1} height={24} />
              ) : (
                profile.fullName
              )}
            </p>
          </div>
        </div>
      </div>
      {showFollowing ? (
        <div className="fixed top-[30%] left-[50%]  shadow-sm border bg-gray-100">
          <div
            onClick={() => setShowFollowing(false)}
            className="p-1 flex justify-end"
          >
            <ImCancelCircle className="cursor-pointer"></ImCancelCircle>
          </div>
          {followingUsers.length > 0 ? (
            followingUsers.map((user) => {
              return (
                <div
                  className="flex space-x-4 mb-4 pr-[3rem] p-2 "
                  key={user.docId}
                >
                  <div>
                    <img
                      className="rounded-2xl object-cover w-8 text-black-light cursor-pointer"
                      src={`/images/avatars/${user.username}.jpg`}
                      alt="following user profile"
                    />
                  </div>
                  <div>{user.username}</div>
                </div>
              );
            })
          ) : !followingUsers.length === 0 ? null : (
            <div className="p-8">no following</div>
          )}
        </div>
      ) : null}
    </header>
  );
};

export default Header;
