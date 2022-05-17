import React, { useEffect, useState } from 'react';
import { TextField } from '@rmwc/textfield';
import styles from './Search.module.scss';

type SearchFieldProps = {
    submit: (searchString: string) => void;
};

const Search = ({ submit }: SearchFieldProps) => {
    const [searchText, setSearchText] = useState('');
    const [closeIcon, setCloseIcon] = useState('');

    useEffect(() => {
        setCloseIcon(searchText.length > 0 ? 'close' : '');
    }, [searchText]);

    return (
        <div className={styles.SearchFieldWrapper}>
            <TextField
                outlined
                className={styles.SearchField}
                icon="search"
                value={searchText}
                type="text"
                onChange={(ev: any) => {
                    setSearchText(ev.target.value);
                }}
                onKeyUp={(ev: any) => {
                    if (ev.key === 'Enter') {
                        submit(searchText);
                    }
                }}
                trailingIcon={{
                    icon: closeIcon,
                    onClick: () => {
                        setSearchText('');
                    },
                }}
            />
        </div>
    );
};

export default Search;
