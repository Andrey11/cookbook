import React, { CSSProperties, useState } from 'react';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import {
    Card,
    CardPrimaryAction,
    CardMedia,
    CardActions,
    CardActionIcons,
    CardActionIcon,
} from '@rmwc/card';

type AddRecipeCardProps = {
    createRecipe: (name: string, image: string) => void;
    name: string;
    visible: boolean;
    onNameChange: (name: string) => void;
};

const AddRecipeCard = ({
    createRecipe,
    name,
    onNameChange,
    visible,
}: AddRecipeCardProps) => {
    const [image, setImage] = useState('url(/images/mb-bg-fb-16.png)');

    return (
        <>
            <Card style={{ width: '21rem' }}>
                <CardPrimaryAction
                    onClick={() => {
                        createRecipe(name, image);
                        setImage('url(/images/image-002-600x400.png)');
                    }}
                >
                    <CardMedia
                        sixteenByNine
                        style={{ backgroundImage: image } as CSSProperties}
                    />
                </CardPrimaryAction>
                <CardActions>
                    <CardActionIcons>
                        <CardActionIcon
                            onIcon="add_a_photo"
                            icon="add_a_photo"
                        />
                        <CardActionIcon icon="add_photo_alternate" />
                        <CardActionIcon icon="insert_photo" />
                    </CardActionIcons>
                </CardActions>
            </Card>
            <div style={{ padding: '0 0 1rem 0' }}>
                {/* <div style={{ padding: "0 0 0 0" }}> */}
                <Typography use="headline6" tag="h2">
                    <TextField
                        fullwidth
                        outlined
                        required
                        label="Recipe name"
                        style={{ display: 'inline-flex' } as CSSProperties}
                        value={name}
                        onChange={(val: any) => onNameChange(val.target.value)}
                        noValidate={!visible}
                    />
                </Typography>
                <Typography use="body1" tag="div">
                    Tags go here
                </Typography>
            </div>
        </>
    );
};

export default AddRecipeCard;
