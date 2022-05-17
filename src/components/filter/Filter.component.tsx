import React, { useState } from 'react';
import { Typography } from '@rmwc/typography';
import { Chip, ChipSet } from '@rmwc/chip';
import { Button } from '@rmwc/button';
import styles from './Filter.module.scss';

type FilterOwnProps = {
    visible: boolean;
    reset: () => void;
    submit: (filterData?: FiterSearchProps) => void;
};

export type FiterSearchProps = {
    myRecipes: boolean;
    likedRecipes: boolean;
    italian: boolean;
    russian: boolean;
    french: boolean;
};

const defaultFiterState: FiterSearchProps = {
    myRecipes: true,
    likedRecipes: true,
    italian: true,
    russian: true,
    french: true,
};

const Filter = ({ visible, reset, submit }: FilterOwnProps) => {
    const [selected, setSelected] = useState(defaultFiterState);

    const openCls = visible ? styles.PanelOpen : '';

    const toggleSelected = (key: string, selState: boolean) => {
        setSelected({
            ...selected,
            [key]: !selState,
        });
    };

    const resetFilters = () => {
        setSelected(defaultFiterState);
        reset();
    };

    const submitFilters = () => {
        submit(selected);
    };

    return (
        <div className={`${styles.Panel} ${openCls}`}>
            <div className={styles.PanelHeader}>
                <Typography use="overline">Filters</Typography>
            </div>

            <div className={styles.PanelBody}>
                <Typography use="caption">Data sources</Typography>
                <ChipSet choice>
                    <Chip
                        icon="label"
                        selected={selected.myRecipes}
                        onInteraction={() =>
                            toggleSelected('myRecipes', selected.myRecipes)
                        }
                    >
                        My Recipes
                    </Chip>
                    <Chip
                        icon="label"
                        selected={selected.likedRecipes}
                        onInteraction={() =>
                            toggleSelected(
                                'likedRecipes',
                                selected.likedRecipes
                            )
                        }
                    >
                        Liked Recipes
                    </Chip>
                </ChipSet>
                <Typography use="caption">Data types</Typography>
                <ChipSet choice>
                    <Chip
                        icon="label"
                        selected={selected.russian}
                        onInteraction={() =>
                            toggleSelected('russian', selected.russian)
                        }
                    >
                        Russian
                    </Chip>
                    <Chip
                        icon="label"
                        selected={selected.french}
                        onInteraction={() =>
                            toggleSelected('french', selected.french)
                        }
                    >
                        French
                    </Chip>
                    <Chip
                        icon="label"
                        selected={selected.italian}
                        onInteraction={() =>
                            toggleSelected('italian', selected.italian)
                        }
                    >
                        Italian
                    </Chip>
                </ChipSet>
            </div>

            <div className={styles.PanelFooter}>
                <Button
                    aria-label="Reset filters"
                    label="Reset"
                    icon="refresh"
                    onClick={() => resetFilters()}
                />
                <Button
                    aria-label="Search with filter"
                    raised
                    label="Search"
                    onClick={() => submitFilters()}
                />
            </div>
        </div>
    );
};

export default Filter;
