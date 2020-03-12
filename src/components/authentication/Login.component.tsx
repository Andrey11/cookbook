import React, {
  CSSProperties,
  useState,
  useEffect,
  SyntheticEvent
} from "react";
import { Typography } from "@rmwc/typography";
import { useHistory } from "react-router-dom";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { User } from "./Authentication.types";

type LoginUserProps = {
  username: string;
  password: string;
  isLoggedIn: boolean;
  cookbookId: string;
  loginUser: Function;
};

const Login = ({
  username,
  password,
  isLoggedIn,
  cookbookId,
  loginUser
}: LoginUserProps) => {
  const history = useHistory();
  const [email, setEmail] = useState(username);
  const [pwd, setPwd] = useState(password);

  useEffect(() => {
    if (isLoggedIn && cookbookId && cookbookId.length > 0) {
      history.replace("cookbook/" + cookbookId);
    }
  });

  console.log("user logged in: " + isLoggedIn);
  return (
    <div>
      Login
      <TextField
        outlined
        label="Username"
        value={email}
        onChange={(val: any) => setEmail(val.target.value)}
      />
      <TextField
        outlined
        type="password"
        label="Password"
        value={pwd}
        onChange={(val: any) => setPwd(val.target.value)}
      />
      <Button
        aria-label="Login"
        label="Login"
        onClick={() => loginUser(email, pwd)}
      />
    </div>
  );
};

export default Login;
