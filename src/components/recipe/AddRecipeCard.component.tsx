import React, { CSSProperties } from 'react';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import {
    Card,
    // CardPrimaryAction,
    CardMedia,
    CardActions,
    CardActionIcons,
    CardActionIcon,
} from '@rmwc/card';

import styles from './RecipeCard.module.scss';

type AddRecipeCardProps = {
    name: string;
    onNameChange: (name: string) => void;
};

const AddRecipeCard: React.FunctionComponent<AddRecipeCardProps> = ({ name, onNameChange }: AddRecipeCardProps) => {
    // const [image, setImage] = useState('url(/images/mb-bg-fb-16.png)');

    return (
        <>
            <Card style={{ width: '21rem' }}>
                {/* <CardPrimaryAction
                    onClick={() => {
                        createRecipe(name, image);
                        setImage('url(/images/image-002-600x400.png)');
                    }}
                >*/}
                <CardMedia
                    sixteenByNine
                    style={
                        {
                            backgroundImage: 'url(/images/mb-bg-fb-16.png)',
                        } as CSSProperties
                    }
                />
                {/*</CardPrimaryAction> */}
                <CardActions>
                    <CardActionIcons>
                        <CardActionIcon onIcon="add_a_photo" icon="add_a_photo" />
                        <CardActionIcon icon="add_photo_alternate" />
                        <CardActionIcon icon="insert_photo" />
                    </CardActionIcons>
                </CardActions>
            </Card>
            <div style={{ padding: '0 0 1rem 0', marginTop: '1rem' }}>
                {/* <div style={{ padding: "0 0 0 0" }}> */}
                {/* <Typography use="headline6" tag="h2"> */}
                <TextField
                    className={styles.RecipeCardField}
                    outlined
                    required
                    label="Recipe name"
                    value={name}
                    onChange={(val: any) => onNameChange(val.target.value)}
                    // noValidate={!visible}
                />
                <Typography use="body1" tag="div">
                    Tags go here
                </Typography>
            </div>
        </>
    );
};

export default AddRecipeCard;
