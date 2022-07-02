import React, { useEffect, CSSProperties, useState, useRef } from 'react';
import { Typography } from '@rmwc/typography';
import { Snackbar } from '@rmwc/snackbar';
import {
  Card,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon,
} from '@rmwc/card';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  updateUserDataAsync,
  loadUserAvatarAsync,
  getUserId,
  isUserInfoLoaded,
  getUserAvatarInfo,
} from '../../authentication/Authentication.reducer';
import { UserAvatarType } from '../../authentication/Authentication.types';

import styles from './AvatarSelector.module.scss';

const AvatarSelector: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const userAvatarInfo: UserAvatarType = useAppSelector(getUserAvatarInfo);
  const userId: string = useAppSelector(getUserId);
  const userInfoLoaded: boolean = useAppSelector(isUserInfoLoaded);

  const [localAvatarName, setLocalAvatarName] = useState('');
  const [localAvatarUrl, setLocalAvatarUrl] = useState('');
  const [avatarDirty, setAvatarDirty] = useState<boolean>(false);

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const inputFile: any = useRef(null);

  useEffect(() => {
    if (!updating) {
      setLocalAvatarName(userAvatarInfo.avatarName);
      setLocalAvatarUrl(userAvatarInfo.avatarUrl);
    }
  }, [userAvatarInfo, updating]);

  useEffect(() => {
    setAvatarDirty(userAvatarInfo.avatarUrl !== localAvatarUrl);
  }, [userAvatarInfo, localAvatarUrl]);

  useEffect(() => {
    if (userInfoLoaded && userId && localAvatarName) {
      const avatarPath = `${userId}/${localAvatarName}`;
      dispatch(loadUserAvatarAsync(avatarPath));
    }
  }, [userInfoLoaded, userId, localAvatarName]);

  const onUpdateClicked = () => {
    setUpdating(true);
    dispatch(
      updateUserDataAsync({
        userId,
        avatarName: localAvatarName,
      })
    );
  };

  // TODO: Add logic to
  //       - upload file to storage
  //       - update user info in firestore with filename
  const onImageSelected = () => {
    inputFile.current.click();
  };

  const onFileSelected = (event: any) => {
    console.log('[Account] onFIleSelected');
    const uploadData: any = {
      userId: userId,
      file: event.target.files[0],
    };
    const objUrl = URL.createObjectURL(event.target.files[0]);
    setLocalAvatarUrl(objUrl);
    // dispatch(uploadUserAvatarAsync(uploadData));
  };

  return (
    <>
      <div className={styles.AvatarSelectorForm}>
        <input type="file" ref={inputFile} onChange={onFileSelected} accept="image/*" style={{ display: 'none' }} />
        <Card className={styles.AvatarSelectorFormCard}>
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <Typography use="overline" tag="h2" style={{ textAlign: 'center' }}>
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
            <CardActionIcons className={styles.AvatarSelectorActionIcons}>
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
              <CardActionIcon icon="add_a_photo" onClick={onImageSelected} />
            </CardActionIcons>
          </CardActions>
          <CardActions>
            <CardActionButtons className={styles.AvatarSelectorActions}>
              <CardActionButton raised={true} onClick={onUpdateClicked} disabled={!avatarDirty}>
                Update
              </CardActionButton>
              <CardActionButton
                raised={true}
                onClick={onUpdateClicked}
                style={{ display: avatarDirty ? 'block' : 'none' }}
              >
                Cancel
              </CardActionButton>
            </CardActionButtons>
          </CardActions>
        </Card>
      </div>
      <Snackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message="Start aligned, open until dismissed"
        icon="check"
        timeout={2500}
      />
    </>
  );
};

export default AvatarSelector;
