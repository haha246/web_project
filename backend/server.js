import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import guessRoute from './routes/guess.js'
import recipeRoute from './routes/recipe.js'
import "dotenv-defaults/config.js"

const app = express();
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const startServer = () =>{

  if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
  }

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = mongoose.connection

  db.on('error', (error) => {
    console.error(error)
  })

  db.once('open', () => {
    console.log('MongoDB connected!')
    app.use('/guess', guessRoute)
    app.use('/recipe', recipeRoute)
  })

  const port = process.env.PORT || 4000

  app.listen(port, () =>
      console.log(`listening on port ${port}!`),
  );
}

export default startServer;