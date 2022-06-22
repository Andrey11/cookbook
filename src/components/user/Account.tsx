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
import styles from './Account.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { HEADER_TYPE } from '../header/Header.types';
import Header from '../header/Header';
import { 
    getStatus,
    getUserData,
    getUserEmail, 
    loadUserDataAsync, 
    updateUserDataAsync, 
    loadUserAvatarAsync,
    userCookbookId,
    uploadUserAvatarAsync
} from '../authentication/Authentication.reducer';
// import { setAvatar } from './AccountApi';
import { UserData } from '../authentication/Authentication.types';

const Account: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const status: string = useAppSelector(getStatus);

    const email: string = useAppSelector(getUserEmail);
    const userData: UserData = useAppSelector(getUserData);
    const userId: string = useAppSelector(userCookbookId);

    const [loaded, setLoaded] = useState(false);
    const [localNname, setLocalNname] = useState('');
    const [localFname, setLocalFname] = useState('');
    const [localLname, setLocalLname] = useState('');
    const [localAvatarName, setLocalAvatarName] = useState('');
    const [localAvatarUrl, setLocalAvatarUrl] = useState('');

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
        if (status  === 'loading') {

        } else if (status === 'idle' && updating) {
            setShowSnackbar(true);
            setUpdating(false);
        }
    }, [status, updating]);

    useEffect(() => {
        if (!loaded && userId) {
            console.log('[Account] not loaded use effect');
            dispatch(loadUserDataAsync(userId));
            setLoaded(true);
        } else if (loaded && userId && localAvatarName) {
            const avatarPath = `${userId}/${localAvatarName}`;
            dispatch(loadUserAvatarAsync(avatarPath));
        }
    }, [loaded, userId, localAvatarName]);

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
        dispatch(uploadUserAvatarAsync(uploadData));
    }

    return (
        <>
            <Header
                type={HEADER_TYPE.LOGIN}
                backButtonTooltip="Back to Cookbook"
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
                        <CardActionIcons>
                            <CardActionIcon
                                icon="add_a_photo"
                                onClick={onImageSelected}
                            />
                        </CardActionIcons>
                    </CardActions>
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <Typography
                            use="overline"
                            tag="h2"
                            style={{ textAlign: 'center' }}
                        >
                            Edit Account
                        </Typography>
                        <TextField
                            className={styles.AccountField}
                            outlined
                            readOnly
                            disabled
                            label='Email'
                            value={email}
                        />
                        <TextField
                            className={styles.AccountField}
                            outlined
                            label='Nickname'
                            value={localNname}
                            onChange={(event:any) => setLocalNname(event.target.value)}
                        />
                        <TextField
                            className={styles.AccountField}
                            outlined
                            label='Firstname'
                            value={localFname}
                            onChange={(event:any) => setLocalFname(event.target.value)}
                        />
                        <TextField
                            className={styles.AccountField}
                            outlined
                            label='Lastname'
                            value={localLname}
                            onChange={(event:any) => setLocalLname(event.target.value)}
                        />
                    </div>
                    <CardActions>
                        <CardActionButtons className={styles.AccountActions}>
                            <CardActionButton
                                icon='logout'
                                raised={true}
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </CardActionButton>
                            <CardActionButton
                                raised={true}
                                onClick={onUpdateClicked}
                            >
                                Update
                            </CardActionButton>
                        </CardActionButtons>
                    </CardActions>
                </Card>
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
