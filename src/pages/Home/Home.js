import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import RecipeCardList from '../../components/recipe-card/RecipeCardList';

import useRecipe from '../../core/useRecipe'
import { useAuthState, useAuthDispatch } from '../../context' 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useAuthDispatch()
  const userState = useAuthState()
  const { searchRecipe,  } = useRecipe(dispatch);

  useEffect(() => {
    searchRecipe()
  }, [])

  return (
    <div className={classes.root}>
      <RecipeCardList cards={userState.recipes}></RecipeCardList>
    </div>
  )
}

