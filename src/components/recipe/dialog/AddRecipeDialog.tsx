import React from 'react';
import { SimpleDialog, DialogOnCloseEventT } from '@rmwc/dialog';
import AddRecipeCard from '../AddRecipeCard.component';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
    getRecipeName,
    isRecipeDialogVisible,
    setRecipeName,
    setRecipeDialogVisible,
} from './addRecipeSlice';
import { createRecipe } from './AddRecipeApi';
import styles from './AddRecipeDialog.module.scss';
import { getUserData } from '../../authentication/Authentication.reducer';
import { UserData } from '../../authentication/Authentication.types';

const AddRecipeDialog: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const visible: boolean = useAppSelector(isRecipeDialogVisible);
    const name: string = useAppSelector(getRecipeName);
    const userInfo: UserData = useAppSelector(getUserData);

    return (
        <SimpleDialog
            open={visible}
            // title={
            //     <Typography
            //         use="overline"
            //         tag="div"
            //         style={{ textAlign: 'center' }}
            //     >
            //         Edit Account
            //     </Typography>
            // }
            title='Create Recipe'
            acceptLabel='Create'
            className={styles.AddRecipeDialog}
            onClose={(evt: DialogOnCloseEventT) => {
                const actionType: string = evt.detail.action || '';
                if (actionType === 'accept') {
                    dispatch(createRecipe(name, userInfo));
                } else {
                    dispatch(setRecipeDialogVisible(false));
                }
            }}
        >
            <AddRecipeCard
                name={name}
                onNameChange={(name) => dispatch(setRecipeName(name))}
            />
        </SimpleDialog>
    );
};

export default AddRecipeDialog;
