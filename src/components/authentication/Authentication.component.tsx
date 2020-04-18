import React, { useEffect, CSSProperties } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@rmwc/textfield";
import { Typography } from "@rmwc/typography";
import {
  Card,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton
} from "@rmwc/card";
import {
  AuthenticationFormState,
  AuthenticationFormField,
  AuthenticationFormAction
} from "./Authentication.types";
import { AUTH_FORM } from "../../utils/Constants";
import { HEADER_TYPE } from "components/header/Header.types";
import Header from "../header/Header.container";
import styles from "./Authentication.scss";

const Authentication = ({
  formTitle,
  formFields,
  formActions,
  shouldNavigate,
  navigateToUrl
}: AuthenticationFormState) => {
  const history = useHistory();
  const imageUrl = "url(images/image-pot-512.png)";

  const createFormFields = () => {
    return formFields.map((field: AuthenticationFormField) => (
      <TextField
        className={AUTH_FORM.SELECTOR_NAME}
        key={field.id}
        outlined
        type={field.type}
        label={field.label}
        defaultValue={field.value}
      />
    ));
  };

  const createFormActions = () => {
    return formActions.map(
      ({ id, label, onClick }: AuthenticationFormAction) => (
        <CardActionButton key={id} onClick={() => onClick(history)}>
          {label}
        </CardActionButton>
      )
    );
  };

  useEffect(() => {
    console.log("styles: " + `${styles.authForm}`);
    if (shouldNavigate) {
      history.replace(navigateToUrl);
    }
  }, [shouldNavigate]);

  return (
    <>
      <Header type={HEADER_TYPE.LOGIN} />
      <div className={"authForm"}>
        <Card style={{ width: "21rem" }}>
          {/* <CardPrimaryAction onClick={() => console.log("clicked")}> */}
          <CardMedia
            sixteenByNine
            style={
              {
                backgroundImage: imageUrl,
                backgroundSize: "contain"
              } as CSSProperties
            }
          />
          {/* </CardPrimaryAction> */}
          <div style={{ padding: "0 1rem 1rem 1rem" }}>
            <Typography use="headline4" tag="h2">
              {formTitle}
            </Typography>
            {createFormFields()}
          </div>
          <CardActions>
            <CardActionButtons>{createFormActions()}</CardActionButtons>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default Authentication;
