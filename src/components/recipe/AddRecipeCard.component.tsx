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

type AddRecipeCardProps = {
    name: string;
    onNameChange: (name: string) => void;
};

const AddRecipeCard: React.FunctionComponent<AddRecipeCardProps> = ({
    name,
    onNameChange
}: AddRecipeCardProps) => {
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
                        style={{ 
                            backgroundImage: 'url(/images/mb-bg-fb-16.png)' 
                        } as CSSProperties}
                    />
                {/*</CardPrimaryAction> */}
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
                {/* <Typography use="headline6" tag="h2"> */}
                    <TextField
                        outlined
                        required
                        label="Recipe name"
                        // style={{ display: 'inline-flex' } as CSSProperties}
                        value={name}
                        onChange={(val: any) => onNameChange(val.target.value)}
                        // noValidate={!visible}
                    />
                {/* </Typography> */}
                <Typography use="body1" tag="div">
                    Tags go here
                </Typography>
            </div>
        </>
    );
};

export default AddRecipeCard;
