import { Avatar, Container, Grid, Typography } from "@material-ui/core";
import ReceiptIcon from '@material-ui/icons/Receipt';
import { makeStyles } from '@material-ui/core/styles';

import RecipeCard from "./RecipeCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function RecipeCardList({ cards, showToolbar=false }) {
  const classes = useStyles();

  return (
    <>
      {cards && cards.length !== 0 ? (
        cards.map((card, i) => {
          return i % 4 !== 0 ? (
            ""
          ) : (
            <Grid container key={i}>
              {
                i < cards.length ? 
                  (<Grid item xs={6} xl={6} sm={3}>
                    <RecipeCard card={cards[i]} showToolbar={showToolbar}></RecipeCard>
                  </Grid>): <></>
              }
              {
                i+1 < cards.length ? 
                  (<Grid item xs={6} xl={6} sm={3}>
                    <RecipeCard card={cards[i+1]} showToolbar={showToolbar}></RecipeCard>
                  </Grid>): <></>
              }
              {
                i+2 < cards.length ? 
                  (<Grid item xs={6} xl={6} sm={3}>
                    <RecipeCard card={cards[i+2]} showToolbar={showToolbar}></RecipeCard>
                  </Grid>): <></>
              }
              {
                i+3 < cards.length ? 
                  (<Grid item xs={6} xl={6} sm={3}>
                    <RecipeCard card={cards[i+3]} showToolbar={showToolbar}></RecipeCard>
                  </Grid>): <></>
              }
            </Grid>
          );
        })
      ) : (
        <>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.icon}>
                <ReceiptIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                No Recipe
              </Typography>
            </div>
          </Container>
        </>
      )}
    </>
  );
}
