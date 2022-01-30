import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import RecipeCardList from '../../components/recipe-card/RecipeCardList'

import useRecipe from '../../core/useRecipe'
import { useAuthState, useAuthDispatch } from '../../context'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

export default function Personal() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useAuthDispatch()
  const userState = useAuthState()
  const { searchRecipe } = useRecipe(dispatch)

  useEffect(() => {
    if (!userState.user) {
      const { from } = { from: { pathname: '/login' } }
      history.push(from)
    }
    searchRecipe(userState.user ? userState.user.email : '')
  }, [])

  return (
    <div className={classes.root}>
      <RecipeCardList
        cards={userState.recipes}
        showToolbar={true}
      ></RecipeCardList>
    </div>
  )
}
