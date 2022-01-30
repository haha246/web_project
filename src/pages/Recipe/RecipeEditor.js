import { Avatar, Button, CssBaseline, TextField, List, ListItem, ListItemAvatar, ListItemSecondaryAction, Divider, ListSubheader } from '@material-ui/core';
import {
  useHistory,
  useLocation
} from "react-router-dom";

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import Copyright from '../../components/copyright/Copyright';
import { useState } from 'react';

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
}));

export default function RecipeEditor() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [steps, setSteps] = useState([''])
  const { createPrivateRecipe } = useRecipe();

  const submit = () => {
    createPrivateRecipe({
      recipeName,
      ingredients: ingredients.filter(ingredients => ingredients.trim() !== ''),
      step: steps.filter(steps => steps.trim() !== ''),
    })
    const { from } = location.state || { from: { pathname: "/" } };
    history.push(from)
  }

  const setIngredient = (value, i) => {
    const newIngredients = [...ingredients]
    newIngredients[i] = value
    setIngredients(newIngredients)
  }

  const deleteIngredient = (i) => {
    const newIngredients = [...ingredients]
    newIngredients.splice(i, 1)
    setIngredients(newIngredients)
  }

  const addNewIngredient = () => {
    const newIngredients = [...ingredients]
    newIngredients.push('')
    setIngredients(newIngredients)
  }

  const setStep = (value, i) => {
    const newSteps = [...steps]
    newSteps[i] = value
    setSteps(newSteps)
  }

  const deleteStep = (i) => {
    const newSteps = [...steps]
    newSteps.splice(i, 1)
    setSteps(newSteps)
  }

  const addNewStep = () => {
    const newSteps = [...steps]
    newSteps.push('')
    setSteps(newSteps)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Recipe
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="recipe-name"
            label="Recipe Name"
            name="recipeName"
            autoFocus
            type="text"
            value={recipeName}
            onChange={(event) => setRecipeName(event.target.value)}
          />
          <Divider />
          <List 
            subheader={<ListSubheader component="div" id="nested-list-subheader">Ingredients</ListSubheader>} 
            component="nav" 
            aria-label="main mailbox folders"
          >
            {ingredients.map((ingredient, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name={`ingredient-${i+1}`}
                  label={`Ingredient-${i+1}`}
                  id={`ingredient-${i+1}`}
                  type="text"
                  value={ingredient}
                  onChange={(event) => setIngredient(event.target.value, i)}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteIngredient(i)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={addNewIngredient}
            >
              Add new ingredient
            </Button>
          </List>
          <Divider />
          <List
            subheader={<ListSubheader component="div" id="nested-list-subheader">Steps</ListSubheader>}
            component="nav"
            aria-label="main mailbox folders"
          >
            {steps.map((step, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name={`step-${i+1}`}
                  label={`Step-${i+1}`}
                  id={`step-${i+1}`}
                  type="text"
                  value={step}
                  onChange={(event) => setStep(event.target.value, i)}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteStep(i)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={addNewStep}
            >
              Add new step
            </Button>
          </List>
          <Divider />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Submit
          </Button>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showMessage}
        onClose={handleClose}
        message={errorTextMap.errorMessage}
        autoHideDuration={2000}
        key="top-center"
      /> */}
    </Container>
  )
}