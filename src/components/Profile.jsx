/*
Needs imports to be able to work: useEffect and useNavigate at minimum
*/
import { fetchAccount } from "../API/index.js";
import { useState, useEffect } from "react";
import { Heading, Text } from "@chakra-ui/react";
import useShopUser from "./context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const localToken = localStorage.getItem("userToken");

  const { isLoggedIn } = useShopUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function AccountFetch() {
      try {
        if (!isLoggedIn) navigate("/users/login");
        const data = await fetchAccount(JSON.parse(localToken));
        // console.log(data);

        return setUser(data);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    }
    AccountFetch();
  }, [isLoggedIn, localToken, navigate]);

  return (
    <section id="profile-page">
      {user && (
        <>
          <Heading color="#532C38" fontSize={"3.6em"}>
            {user.userAccount.username}
          </Heading>
          <div>
            <Text color="#886670" fontSize={"1.3em"}>
              {user.userAccount.first_name} {user.userAccount.last_name}
            </Text>
          </div>
        </>
      )}
      {err && <h2>{err}</h2>}
    </section>
  );
}
