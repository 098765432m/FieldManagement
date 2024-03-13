"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCookie, getCookies, hasCookie } from "cookies-next";

function ManageField() {
  const { push } = useRouter();

  const [check, setCheck] = useState(false);

  function checkCookie() {
    if (hasCookie("userData")) {
      setCheck(true);
      return true;
    } else {
      setCheck(false);
      return false;
    }
  }

  useEffect(() => {
    if (checkCookie() === true) {
      console.log(true);
    } else {
      console.log(false);
      push("/manager");
    }
  }, []);
  return (
    <div>
      <button className="border-4" onClick={() => checkCookie()}>
        Check
      </button>
      {check && <h1>Dep traiu</h1>}
    </div>
  );
}

export default ManageField;
