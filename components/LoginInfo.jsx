import { useContext } from "react";
import { UserContext } from "./context/User";

const LoginInfo = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <div id="login-info">
      <p> Logged in as {loggedInUser.username}</p>
    </div>
  );
};
export default LoginInfo;
