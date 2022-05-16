import React, { CSSProperties, useEffect } from "react";
import { Typography } from "@rmwc/typography";
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon,
} from "@rmwc/card";
import { useNavigate } from "react-router-dom";

type RecipeCardProps = {
  recipeId: string | null;
  imageUrl: string | null;
  recipeTitle: string | "Title";
  isLoaded: boolean;
  loadData: (recipeId: string) => void;
};

const RecipeCard = ({
  recipeId,
  imageUrl,
  recipeTitle,
  isLoaded,
  loadData,
}: RecipeCardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded && recipeId) {
      console.log("Should load recipe");
      if (typeof loadData === "function") {
        loadData(recipeId);
      }
    }
  });

  return (
    <Card style={{ width: "auto" }}>
      {/* <Card style={{ width: "21rem" }}></Card> */}
      <CardPrimaryAction onClick={() => navigate("/recipe/" + recipeId)}>
        <CardMedia
          sixteenByNine
          style={{ backgroundImage: imageUrl } as CSSProperties}
        />
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          <Typography use="headline6" tag="h2">
            {recipeTitle}
          </Typography>
          <Typography use="subtitle2" tag="h3" style={{ marginTop: "-1rem" }}>
            by Some Author
          </Typography>
          <Typography use="body1" tag="div">
            Visit food that you like to eat, and you will always be happy every
            day.
          </Typography>
        </div>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <CardActionButton>Read</CardActionButton>
          <CardActionButton>Bookmark</CardActionButton>
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
