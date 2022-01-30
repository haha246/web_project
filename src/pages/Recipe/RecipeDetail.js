import {
  Avatar,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  ListSubheader,
} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import FolderIcon from '@material-ui/icons/Folder'

import Copyright from '../../components/copyright/Copyright'
import { useEffect } from 'react'
import useRecipe from '../../core/useRecipe'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function RecipeDetail() {
  const classes = useStyles()
  const { rid } = useParams()
  const { getPrivateRecipe } = useRecipe()
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    getPrivateRecipe(rid).then((r) => {
      setRecipe(r)
    })
  }, [])

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Recipe
        </Typography>
        <div className={classes.form} noValidate>
          <Typography paragraph>Recipe Name: {recipe.recipeName}</Typography>
          <Divider />
          <List
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                Ingredients
              </ListSubheader>
            }
            component='nav'
            aria-label='main mailbox folders'
          >
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography paragraph>{ingredient}</Typography>
                </ListItem>
              ))}
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                Steps
              </ListSubheader>
            }
            component='nav'
            aria-label='main mailbox folders'
          >
            {recipe.step &&
              recipe.step.map((step, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Typography paragraph>{step}</Typography>
                </ListItem>
              ))}
          </List>
          <Divider />
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
