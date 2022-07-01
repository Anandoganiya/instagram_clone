import React, { useState, useEffect, useContext } from "react";
import userContext from "../context/userContext";
import { getUserInfo } from "../services/firebase";

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(userContext);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const [response] = await getUserInfo(user?.uid);
        setActiveUser(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (user.uid) {
      getUserData();
    }
  }, [user]);

  return { user: activeUser };
};

export default useUser;
