import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/index";
import UserProfile from "../components/profile/UserProfile";
import { getUserByUsername } from "../services/firebase";
import { useStore } from "../context/ModalContext";
import Modal from "../components/Modal";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();
  const { toggleModal } = useStore();
  useEffect(() => {
    const getUser = async () => {
      const [userInfo] = await getUserByUsername(username);
      if (userInfo?.userId) {
        setUser(userInfo);
      } else {
        navigate("/p/not-found");
      }
    };
    if (username) {
      getUser();
    }
  }, [username]);

  return (
    <div>
      {/* <Header /> */}
      <div className="mx-auto w-3/4">
        <UserProfile userInfo={user} />
      </div>
      {toggleModal ? <Modal /> : null}
    </div>
  );
};

export default Profile;
