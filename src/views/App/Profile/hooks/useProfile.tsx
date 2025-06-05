"use client";
import useAuth from "@hooks/useAuth";
import type { User } from "@models/user";
import { useState } from "react";

const useProfile = () => {
  const { currentUser } = useAuth();

  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState<User>(currentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    editable,
    setEditable,
    user,
    setUser,
    handleChange,
  };
};

export default useProfile;
