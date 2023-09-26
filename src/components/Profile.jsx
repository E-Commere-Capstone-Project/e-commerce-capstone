/*
Needs imports to be able to work: useEffect and useNavigate at minimum
*/
import { fetchAccount } from "../API/index.js";
import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const localToken = localStorage.getItem("userToken");

  useEffect(() => {
    async function AccountFetch() {
      try {
        const data = await fetchAccount(JSON.parse(localToken));
        console.log(data);

        return setUser(data);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    }
    AccountFetch();
  }, [localToken]);

  return (
    <>
      {user && (
        <>
          <h1>{user.userAccount.username}</h1>
          <div>
            <h3>
              {user.userAccount.first_name} {user.userAccount.last_name}
            </h3>
          </div>
        </>
      )}
      {err && <h2>{err}</h2>}
    </>
  );
}
