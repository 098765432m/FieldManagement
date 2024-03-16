"use client";

import { useEffect, useState } from "react";

import Conditional from "@/components/Conditional";
import { getCookie, hasCookie } from "cookies-next";

function ManageField() {
  const [userExist, setUserExist] = useState(false);
  const [userObject, setUserObject] = useState<any>({});

  useEffect(() => {
    if (hasCookie("userData")) {
      setUserExist(true);
      const cookie = getCookie("userData");
      if (typeof cookie === "string") {
        setUserObject(JSON.parse(cookie));
      }
    }
  }, []);
  return (
    <div>
      <Conditional showWhen={userExist}>
        <h1>welcome</h1>
        <h2>{userObject._id}</h2>
        <h2>{userObject.username}</h2>
        <h2>{userObject.email}</h2>
      </Conditional>
    </div>
  );
}

export default ManageField;
