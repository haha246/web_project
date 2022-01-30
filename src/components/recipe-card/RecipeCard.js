import React from "react";
import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import { useStyles } from "./RecipeCard.css";
import useRecipe from "../../core/useRecipe";
import { useAuthDispatch } from "../../context";

export default function RecipeCard({ card, showToolbar = true }) {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { deletePrivateRecipe } = useRecipe(dispatch);

  const deleteRecipe = () => {
    deletePrivateRecipe(card._id);
  };

  const redirectToDetail = () => {
    dispatch({ action: "GET_RECIPE", payload: { rid: card._id } });
    history.push({ pathname: `/recipe/${card._id}` });
  };

  return (
    <Card className={classes.root} onClick={redirectToDetail}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          !showToolbar ? (
            ""
          ) : (
            <IconButton aria-label="settings" onClick={deleteRecipe}>
              <DeleteIcon />
            </IconButton>
          )
        }
        title={card.recipeName}
        subheader={`By ${card.ownerEmail}`}
      />
      <CardMedia
        className={classes.media}
        image="https://1.bp.blogspot.com/-eMmAh0YHDOc/WeIT8QSoI1I/AAAAAAAAQPU/dwEb9ijCpyYzj4lGCu2DrvL4-nFBcBZJgCLcBGAs/s1600/classic-bloody-mary-720x720-recipe.jpg"
        title={card.recipeName}
      />
      <CardContent>
        <Typography paragraph>Ingredients:</Typography>
        <Typography>{card.ingredients.join(", ")}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph></Typography>
          <Typography paragraph></Typography>
          <Typography paragraph></Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
