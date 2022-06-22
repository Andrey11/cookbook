import React, { useEffect, useState } from 'react';
import { TextField } from '@rmwc/textfield';
import styles from './Search.module.scss';

type SearchFieldProps = {
    submit: (searchString: string) => void;
};

const Search: React.FunctionComponent<SearchFieldProps> = ({
    submit,
}: SearchFieldProps) => {
    const [searchText, setSearchText] = useState('');
    const [trailingIconCls, setTrailingIconCls] = useState('');

    useEffect(() => {
        setTrailingIconCls(searchText.trim().length > 0 ? '' : styles.Hidden);
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
                    icon: 'close',
                    className: trailingIconCls,
                    onClick: () => {
                        setSearchText('');
                    },
                }}
            />
        </div>
    );
};

export default Search;
