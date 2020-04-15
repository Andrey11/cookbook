import React, { useState, useEffect, FormEvent } from "react";
import { useHistory, Link } from "react-router-dom";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import Header from "components/header/Header.container";

type LoginUserProps = {
  isLoggedIn: boolean;
  cookbookId: string;
  loginUser: Function;
};

const Login = ({ isLoggedIn, cookbookId, loginUser }: LoginUserProps) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (isLoggedIn && cookbookId) {
      history.replace("/cookbook/" + cookbookId);
    }
  }, [isLoggedIn, cookbookId]);

  console.log("user logged in: " + isLoggedIn);
  return (
    <div>
      <Header type="login" />
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
      <Link
        to={{
          pathname: "/create",
          hash: "#",
          search: ""
        }}
      >
        Create Account
      </Link>
    </div>
  );
};

export default Login;
