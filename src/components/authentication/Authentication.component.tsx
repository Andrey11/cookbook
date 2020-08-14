import React, { useEffect, CSSProperties, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@rmwc/textfield";
import { Typography } from "@rmwc/typography";
import { Chip } from "@rmwc/chip";
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
  AuthenticationFormAction,
  FormFieldState,
  FieldType
} from "./Authentication.types";
import { HEADER_TYPE } from "components/header/Header.types";
import Header from "../header/Header.container";
import styles from "./Authentication.module.scss";

const Authentication = ({
  formTitle,
  formFields,
  formActions,
  errors,
  formErrors,
  clearError,
  shouldNavigate,
  navigateToUrl
}: AuthenticationFormState) => {
  const history = useHistory();
  const imageUrl = "url(images/image-pot-512.png)";

  const [authFormInitialized, setAuthFormInitialized] = useState(false);
  const [fieldError, setFieldErrors] = useState([]);

  const createFormFields = () => {
    return formFields.map((field: AuthenticationFormField) => (
      <TextField
        itemID={field.id}
        className={styles.AuthField}
        key={field.id}
        pattern={field.pattern}
        outlined
        invalid={errors !== null && errors.length > 0}
        autoFocus={false}
        type={field.type}
        label={field.label}
        defaultValue={field.value}
        onChange={(...args) => {
          console.log("changed");
        }}
        helpText={{
          persistent: false,
          validationMsg: true,
          children: field.formError?.errorMessage
        }}
      />
    ));
  };

  const getFormData = () => {
    const fields: NodeList = document.querySelectorAll("." + styles.AuthField);
    const options: Array<FormFieldState> = [];
    fields.forEach((item: any) => {
      const inputField: HTMLInputElement = item.firstElementChild;
      const fieldType: FieldType = item.innerText.toLowerCase();
      const val: string = inputField.value;
      const isValid: boolean = inputField.validity.valid && val.length > 0;
      const opts: FormFieldState = {
        fieldType: fieldType,
        valid: isValid,
        value: val
      };
      options.push(opts);
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
            return onClick(history, getFormData());
          }}
        >
          {label}
        </CardActionButton>
      )
    );
  };

  const createErrorNotification = () => {
    if (formErrors) {
      return (
        <div className={styles.ErrorNotification}>
          <Chip
            icon="error"
            label={errors}
            onTrailingIconInteraction={() => {
              clearError();
            }}
            trailingIcon="close"
          />
        </div>
      );
    }
    return <></>;
  };

  useEffect(() => {
    console.log("styles: " + `${styles.AuthForm}`);
    if (shouldNavigate) {
      clearError();
      history.replace(navigateToUrl);
    } else if (!authFormInitialized) {
      console.log("Initialized form: " + formTitle);
      setAuthFormInitialized(true);
    } else if (fieldError.length > 0) {
      console.log("contains field errors");
    }
  }, [shouldNavigate, authFormInitialized, fieldError]);

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
            {createErrorNotification()}
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
