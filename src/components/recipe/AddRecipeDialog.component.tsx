import React from 'react';
import { SimpleDialog } from '@rmwc/dialog';
import AddRecipeCard from './AddRecipeCard.component';
import { Url } from 'url';

type AddRecipeDialogProps = {
    name: string;
    imageUrl: Url;
    created: boolean;
    visible: boolean;
    onNameChange: (name: string) => void;
    onImageUrlChange: (url: Url) => void;
    onRecipeCreate: (name: string) => void;
    onCloseDialog: () => void;
};

const AddRecipeDialog = ({
    name,
    visible,
    onNameChange,
    onRecipeCreate,
    onCloseDialog,
}: AddRecipeDialogProps) => {
    return (
        <SimpleDialog
            open={visible}
            title="Create new recipe"
            acceptLabel="Create"
            onClose={(evt: any) => {
                const actionType = evt.detail.action;
                if (actionType === 'accept') {
                    onRecipeCreate(name);
                } else {
                    onCloseDialog();
                }
            }}
        >
            <AddRecipeCard
                createRecipe={() => {
                    console.log('AddRecipeCard');
                }}
                visible={visible}
                name={name}
                onNameChange={onNameChange}
            />
        </SimpleDialog>
    );
};

export default AddRecipeDialog;
