import React from "react";
import { Typography } from "@rmwc/typography";
import "../../App.scss";
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon
} from "@rmwc/card";
import "@material/typography/dist/mdc.typography.css";
import "@material/card/dist/mdc.card.css";
import "@material/button/dist/mdc.button.css";
import "@material/icon-button/dist/mdc.icon-button.css";

const RecipeCard = () => {
  return (
    <Card style={{ width: "21rem" }}>
      <CardPrimaryAction>
        <CardMedia
          sixteenByNine
          style={{
            backgroundImage: "url(/images/mb-bg-fb-16.png)"
          }}
        />
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          <Typography use="headline6" tag="h2">
            Our Best Food
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
