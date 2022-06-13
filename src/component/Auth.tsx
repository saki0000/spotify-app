import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, selectToken } from "../features/counter/counterSlice";
import { loginUser } from "../features/userSlice";
import { getTokenFromUrl } from "../spotify";
import LoggedIn from "./loggedin";
import Login from "./login";

const Auth = () => {
  const user_token = useSelector(selectToken);

  const dispatch = useDispatch();
  const getUserProfile = async (token: any) => {
    await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        dispatch(
          loginUser({
            id: res.data.id,
            displayName: res.data.display_name,
            image: res.data.images.url,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const token = hash.access_token;

    if (token) {
      dispatch(login(token));
      console.log(token);
      getUserProfile(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="App">{user_token ? <LoggedIn /> : <Login />}</div>;
};

export default Auth;
