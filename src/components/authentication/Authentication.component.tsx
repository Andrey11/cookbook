import React, { useEffect, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import {
    Card,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionButton,
} from '@rmwc/card';
import {
    AuthenticationFormState,
    AuthenticationFormField,
    AuthenticationFormAction,
} from './Authentication.types';
import styles from './Authentication.module.scss';

const Authentication: React.FunctionComponent<AuthenticationFormState> = ({
    formTitle,
    formFields,
    formActions,
    shouldNavigate,
    navigateToUrl,
    hasError,
}: AuthenticationFormState) => {
    const navigate = useNavigate();
    const imageUrl = 'url(/images/image-pot-512.png)';

    const createFormFields = () => {
        return formFields.map((field: AuthenticationFormField) => (
            <TextField
                className={styles.AuthField}
                key={field.id}
                outlined
                type={field.type}
                label={field.label}
            />
        ));
    };

    const getOptions = (id: string) => {
        console.log('getOptions for ' + id);
        const fields: NodeList = document.querySelectorAll(
            '.' + styles.AuthField
        );
        const options: any = {};
        fields.forEach((item: any) => {
            options[item.innerText.toLowerCase()] =
                item.childNodes.item(1).value;
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
                        return onClick(navigate, options);
                    }}
                >
                    {label}
                </CardActionButton>
            )
        );
    };

    useEffect(() => {
        if (shouldNavigate) {
            console.log('styles: ' + `${styles.AuthForm}`);
            navigate(navigateToUrl, { replace: true });
        } else if (hasError) {
            console.log('hasError');
        }
    }, [shouldNavigate, hasError]);

    return (
        <>
            <div className={styles.AuthForm}>
                <Card style={{ width: '21rem' }}>
                    {/* <CardPrimaryAction onClick={() => console.log("clicked")}> */}
                    <CardMedia
                        sixteenByNine
                        style={
                            {
                                backgroundImage: imageUrl,
                                backgroundSize: 'contain',
                            } as CSSProperties
                        }
                    />
                    {/* </CardPrimaryAction> */}
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <Typography
                            use="overline"
                            tag="h2"
                            style={{ textAlign: 'center' }}
                        >
                            {formTitle}
                        </Typography>
                        {createFormFields()}
                    </div>
                    { hasError && <div>Error</div>}
                    <CardActions>
                        <CardActionButtons
                            style={{
                                justifyContent: 'space-between',
                                flex: 1,
                                flexDirection: 'row-reverse',
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
