"use client";

import { Field } from "@/types/interfaces/field";
import { loginData } from "@/types/interfaces/auth";
import { Login } from "../../utils/auth";

import { useState } from "react";
import { useRouter } from "next/navigation";

// A Manager Page which help admin manage, observe data from web.
function ManagerHome() {
  const { push } = useRouter();
  // const session = await getSession
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [acc, setAcc] = useState<boolean>();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formLogin: loginData = {
      username: username,
      password: password,
    };

    //Redirect to
    if ((await Login(formLogin)) === true) {
      push("/manager/manage");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your Username"
          className="w-20 border border-4 border-red-300"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="text"
          placeholder="Enter your Password"
          className="w-20 border border-4 border-red-300"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Check</button>
      </form>
    </div>
  );
}

export default ManagerHome;
