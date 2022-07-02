import React, { useEffect } from 'react';
import { Typography } from '@rmwc/typography';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon,
} from '@rmwc/card';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { AppDispatch, RootState } from '../../store';
import { loadRecipe } from '../cookbook/CookbookScene.actions';
import {
  getRecipeCreatedBy,
  getRecipeTitle,
  getRecipeUrl,
  isRecipeLoaded,
  isRecipeLoading,
} from './RecipeCard.selector';
import { useSelector } from 'react-redux';
import { ListDivider } from '@rmwc/list';
import { Icon } from '@rmwc/icon';

type RecipeCardProps = {
  recipeId: string;
};

const RecipeCard: React.FunctionComponent<RecipeCardProps> = ({ recipeId }: RecipeCardProps) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  const isLoaded: boolean = useSelector((state: RootState) => isRecipeLoaded(state, recipeId));
  const isLoading: boolean = useSelector((state: RootState) => isRecipeLoading(state, recipeId));
  const imageUrl: string = useSelector((state: RootState) => getRecipeUrl(state, recipeId));
  const recipeTitle: string = useSelector((state: RootState) => getRecipeTitle(state, recipeId));
  const recipeCreatedBy: string = useSelector((state: RootState) => getRecipeCreatedBy(state, recipeId));

  useEffect(() => {
    if (!isLoaded && !isLoading && recipeId) {
      console.log('Should load recipe');
      dispatch(loadRecipe(recipeId));
    }
  }, [isLoaded, isLoading, recipeId]);

  return (
    <Card style={{ width: 'auto' }}>
      <CardPrimaryAction onClick={() => navigate('/recipe/' + recipeId)}>
        <CardMedia
          sixteenByNine
          style={{
            backgroundImage: imageUrl,
          }}
        />
        <div style={{ padding: '0 1rem' }}>
          <Typography use="headline6" tag="h2">
            {recipeTitle}
          </Typography>
          <Typography use="subtitle2" tag="h1" style={{ marginTop: '-1rem' }}>
            by {recipeCreatedBy}
          </Typography>
          <ListDivider />
          <Typography use="body1" tag="h1">
            Visit food that you like to eat, and you will always be happy every day.
          </Typography>
          <ListDivider />
          <Typography
            use="subtitle2"
            tag="div"
            style={{ margin: '0.67rem 0', display: 'flex', flexDirection: 'row', float: 'right', gap: '4px' }}
          >
            <Icon icon="av_timer" /> 45 min
          </Typography>
        </div>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <CardActionButton>View</CardActionButton>
        </CardActionButtons>
        <CardActionIcons>
          <CardActionIcon onIcon="favorite" icon="favorite_border" />
          <CardActionIcon icon="share" />
          <CardActionIcon icon="more_vert" />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
