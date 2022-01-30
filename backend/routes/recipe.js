import express from 'express'
import {Recipe} from '../models/index.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const secretkey = "thisisthekey"

router.post('/homePage', async (req, res) => {
    // return the recipes
	const data = await Recipe.find()
	     			.sort({ _id: 1 });

    res.status(200).send(data);
});

router.get('/search', async (req, res) => {
    const search = req.query.search
	const data = await Recipe.find({ 
        $or: [
            {recipeName: { $regex: search, $options: "$i" }},
            {ingredients: { $regex: search, $options: "$i" }},
            {ownerEmail: { $regex: search, $options: "$i" }},
        ]
    })
	
    res.status(200).send(data)
});

router.post('/private', async (req, res) => {
    
    const recipe = req.body
    if (!req.headers['authorization']) {
        res.sendStatus(403);
        return;
    }
    const token = req.headers['authorization'].replace('Bearer ', '')

    jwt.verify(token, secretkey, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            recipe.ownerEmail = authData.user.email
            Recipe.create(recipe, (err, instance) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(400);
                }
                res.status(200).send(instance)
            })
        }
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id

    const myRecipe = await Recipe.findOne({ _id: id })

    if (myRecipe) {
        res.status(200).send(myRecipe)
    } else {
        res.sendStatus(404)
    }
});

router.get('/private', (req, res) => {
    const userEmail = req.query.userEmail
    const token = req.headers['authorization'].replace('Bearer ', '')

    jwt.verify(token, secretkey, async (err, authData) => {
        if(err) {
            res.sendStatus(403);
        }else{
            const myRecipe = await Recipe.find({ ownerEmail: userEmail })

            res.status(200).send(myRecipe)
        }
    });
});

router.put('/private', (req, res) => {
    const recipe = JSON.parse(req.query.recipe)
	const id = recipe.recipeID
    const token = req.headers['authorization'].replace('Bearer ', '')
    // return updated data { recipes: recipes! }
    jwt.verify(token, secretkey, async (err, authData) => {
        if(err) {
            res.sendStatus(403);
        }else{
            await Recipe.updateOne({ recipeID: id }, recipe )

	        //const data = await Recipe.findOne({recipeID: id})
            res.status(200).send(recipe)
        }
    });
});

router.delete('/private', (req, res) => {
    const id = req.query.recipeID
    console.log('123123', id)
    const token = req.headers['authorization'].replace('Bearer ', '')
    // return deleted data { recipes: recipes }
    jwt.verify(token, secretkey, async (err, authData) => {
        if(err) {
            res.sendStatus(403);
        }else{
            await Recipe.deleteOne({_id: id})
            
            res.status(200).send(id)
        }
    });
});



export default router;