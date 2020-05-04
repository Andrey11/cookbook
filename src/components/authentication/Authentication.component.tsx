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
import { HEADER_TYPE } from "components/header/Header.types";
import Header from "../header/Header.container";
import styles from "./Authentication.module.scss";

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
        className={styles.AuthField}
        key={field.id}
        outlined
        type={field.type}
        label={field.label}
        defaultValue={field.value}
      />
    ));
  };

  const getOptions = (id: string) => {
    const fields: NodeList = document.querySelectorAll("." + styles.AuthField);
    const options: any = {};
    fields.forEach((item: any) => {
      options[item.innerText.toLowerCase()] = item.firstElementChild.value;
    });

    return options;
  };

  const createFormActions = () => {
    return formActions.map(
      ({ id, primary, label, onClick }: AuthenticationFormAction) => (
        <CardActionButton
          raised={primary}
          key={id}
          onClick={() => {
            const options: any = getOptions(id);
            return onClick(history, options);
          }}
        >
          {label}
        </CardActionButton>
      )
    );
  };

  useEffect(() => {
    console.log("styles: " + `${styles.AuthForm}`);
    if (shouldNavigate) {
      history.replace(navigateToUrl);
    }
  }, [shouldNavigate]);

  return (
    <>
      <Header type={HEADER_TYPE.LOGIN} />
      <div className={styles.AuthForm}>
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
            <Typography use="overline" tag="h2" style={{ textAlign: "center" }}>
              {formTitle}
            </Typography>
            {createFormFields()}
          </div>
          <CardActions>
            <CardActionButtons
              style={{
                justifyContent: "space-between",
                flex: 1,
                flexDirection: "row-reverse"
              }}
            >
              {createFormActions()}
            </CardActionButtons>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default Authentication;
