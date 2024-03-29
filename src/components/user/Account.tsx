import React, { useEffect, CSSProperties, useState, useRef } from 'react';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import { Snackbar } from '@rmwc/snackbar';
import {
    Card,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionButton,
    CardActionIcons,
    CardActionIcon
} from '@rmwc/card';
import { logout } from '../authentication/Authentication.actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { HEADER_TYPE } from '../header/Header.types';
import Header from '../header/Header';
import { 
    getStatus,
    getUserData,
    getUserEmail,
    updateUserDataAsync, 
    loadUserAvatarAsync,
    uploadUserAvatarAsync,
    getUserId,
    isUserInfoLoaded
} from '../authentication/Authentication.reducer';
import { UserData } from '../authentication/Authentication.types';

import styles from './Account.module.scss';
import AvatarSelector from 'components/fields/avatars/AvatarSelector';

const Account: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const status: string = useAppSelector(getStatus);

    const email: string = useAppSelector(getUserEmail);
    const userData: UserData = useAppSelector(getUserData);
    const userId: string = useAppSelector(getUserId);
    const userInfoLoaded: boolean = useAppSelector(isUserInfoLoaded);

    const [localNname, setLocalNname] = useState('');
    const [localFname, setLocalFname] = useState('');
    const [localLname, setLocalLname] = useState('');
    const [localAvatarName, setLocalAvatarName] = useState('');
    const [localAvatarUrl, setLocalAvatarUrl] = useState('');
    const [dirty, setDirty] = useState<boolean>(false);
    const [avatarDirty, setAvatarDirty] = useState<boolean>(false);

    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);

    const inputFile: any = useRef(null);

    useEffect(() => {
        if (!updating) {
            setLocalNname(userData.nickname);
            setLocalFname(userData.firstname);
            setLocalLname(userData.lastname);
            setLocalAvatarName(userData.avatarName);
            setLocalAvatarUrl(userData.avatarUrl);
        }
    }, [userData, updating]);

    useEffect(() => {
        const dirt = userData.nickname !== localNname 
            || userData.firstname !== localFname 
            || userData.lastname !== localLname;
        setDirty(dirt);
    }, [userData, localNname, localFname, localLname]);

    useEffect(() => {
        setAvatarDirty(userData.avatarUrl !== localAvatarUrl);
    }, [userData, localAvatarUrl]);

    useEffect(() => {
        if (status  === 'loading') {

        } else if (status === 'idle' && updating) {
            setShowSnackbar(true);
            setUpdating(false);
        }
    }, [status, updating]);

    useEffect(() => {
        if (userInfoLoaded && userId && localAvatarName) {
            const avatarPath = `${userId}/${localAvatarName}`;
            dispatch(loadUserAvatarAsync(avatarPath));
        }
    }, [userInfoLoaded, userId, localAvatarName]);

    const onUpdateClicked = () => {
        setUpdating(true);
        dispatch(updateUserDataAsync({
            userId,
            nickname: localNname.trim(),
            firstname: localFname.trim(),
            lastname: localLname.trim(),
            avatarName: localAvatarName
        }));
    };

    const onImageSelected = () => {
        inputFile.current.click();
    };

    const onFileSelected = (event: any) => {
        console.log('[Account] onFIleSelected');
        const uploadData: any = {
            userId: userId,
            file: event.target.files[0]
        };
        const objUrl = URL.createObjectURL(event.target.files[0])
        setLocalAvatarUrl(objUrl);
        // dispatch(uploadUserAvatarAsync(uploadData));
    };

    const createTextInputField = (
        labelStr: string, 
        valueStr: string, 
        isReadOnly: boolean,
        onChangeFn?: (e: any) => void
    ) => {
        return (
            <TextField
                className={styles.AccountField}
                outlined
                readOnly={isReadOnly}
                disabled={isReadOnly}
                label={labelStr}
                value={valueStr}
                onChange={onChangeFn}
            />
        );
    };

    return (
        <>
            <Header
                type={HEADER_TYPE.ACCOUNT}
                backButtonTooltip="Back to Cookbook"
                title='Account Settings'
                logoutUser={() => dispatch(logout())}
            />
            <div className={styles.AccountForm}>
                <input 
                    type='file' 
                    ref={inputFile} 
                    onChange={onFileSelected} 
                    accept="image/*" 
                    style={{display: 'none'}}
                />
                <Card className={styles.AccountFormCard}>
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <Typography
                            use="overline"
                            tag="h2"
                            style={{ textAlign: 'center' }}
                        >
                            User Info
                        </Typography>
                        { createTextInputField('email', email, true) }
                        { createTextInputField('Nickname', localNname, false, (e) => setLocalNname(e.target.value)) }
                        { createTextInputField('Firstname', localFname, false, (e) => setLocalFname(e.target.value)) }
                        { createTextInputField('Lastname', localLname, false, (e) => setLocalLname(e.target.value)) }
                    </div>
                    <CardActions>
                        <CardActionButtons className={styles.AccountActions}>
                            {/* <CardActionButton
                                icon='logout'
                                raised={true}
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </CardActionButton> */}
                            <CardActionButton
                                raised={true}
                                onClick={onUpdateClicked}
                                disabled={!dirty}
                            >
                                Update
                            </CardActionButton>
                        </CardActionButtons>
                    </CardActions>
                </Card>
                {/* <Card className={styles.AccountFormCard}>
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <Typography
                            use="overline"
                            tag="h2"
                            style={{ textAlign: 'center' }}
                        >
                            Avatar Image
                        </Typography>
                    </div>
                    <CardMedia
                        sixteenByNine
                        style={
                            {
                                backgroundImage: `url(${localAvatarUrl ? localAvatarUrl : '/images/icon-pot.svg'})`,
                                backgroundSize: 'contain',
                            } as CSSProperties
                        }
                    />
                    <CardActions>
                        <CardActionIcons className={styles.AccountAvatarActionIcons}>
                            <CardActionIcon
                                icon="trip_origin"
                                // onClick={onImageSelected}
                            />
                            <CardActionIcon
                                icon="trip_origin"
                                // onClick={onImageSelected}
                            />
                            <CardActionIcon
                                icon="trip_origin"
                                // onClick={onImageSelected}
                            />
                            <CardActionIcon
                                icon="trip_origin"
                                // onClick={onImageSelected}
                            />
                            <CardActionIcon
                                icon="trip_origin"
                                // onClick={onImageSelected}
                            />
                        </CardActionIcons>
                    </CardActions>
                    <CardActions>
                        <CardActionIcons>
                            <CardActionIcon
                                icon="add_a_photo"
                                onClick={onImageSelected}
                            />
                        </CardActionIcons>
                    </CardActions>
                    <CardActions>
                        <CardActionButtons className={styles.AccountActions}>
                            <CardActionButton
                                raised={true}
                                onClick={onUpdateClicked}
                                disabled={!avatarDirty}
                            >
                                Update
                            </CardActionButton>
                            <CardActionButton
                                raised={true}
                                onClick={onUpdateClicked}
                                style={{display: avatarDirty ? 'block' : 'none'}}
                            >
                                Cancel
                            </CardActionButton>
                        </CardActionButtons>
                    </CardActions>
                </Card> */}
                <AvatarSelector />
                {/* <Card className={styles.AccountFormCard}>
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <Typography
                            use="overline"
                            tag="h2"
                            style={{ textAlign: 'center' }}
                        >
                            Settings
                        </Typography>
                    </div>
                    <CardActions>
                        <CardActionButtons className={styles.AccountActions}>
                            <CardActionButton
                                icon='logout'
                                style={{width: '100%'}}
                                raised={true}
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </CardActionButton>
                        </CardActionButtons>
                    </CardActions>
                </Card> */}
            </div>
            <Snackbar
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                message="Start aligned, open until dismissed"
                icon='check'
                timeout={2500}
            />
        </>
    );
};

export default Account;
