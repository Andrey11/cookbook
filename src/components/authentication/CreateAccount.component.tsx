import React, { useState, useEffect } from "react";
import { FormField } from "@rmwc/formfield";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header.container";

type CreateAccountProps = {
  loggedIn: boolean;
  cookbookId: string;
  createUser: (email: string, password: string) => void;
};

const CreateAccount = ({
  loggedIn,
  createUser,
  cookbookId,
}: CreateAccountProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (loggedIn && cookbookId && cookbookId.length > 0) {
      navigate("/cookbook/" + cookbookId, { replace: true });
    }
  });

  return (
    <div>
      <Header type="login" />
      Create Account
      <form>
        <FormField>
          <TextField
            outlined
            required
            label="Username"
            value={email}
            onChange={(val: any) => setEmail(val.target.value)}
          />
        </FormField>
        <FormField>
          <TextField
            outlined
            required
            type="password"
            label="Password"
            autoComplete="new-password"
            value={pwd}
            onChange={(val: any) => setPwd(val.target.value)}
          />
        </FormField>
        <FormField>
          <Button
            aria-label="Create Account"
            label="Create Account"
            onClick={() => createUser(email, pwd)}
          />
        </FormField>
      </form>
    </div>
  );
};

export default CreateAccount;
