import express from 'express'
import { User } from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// var account_email = '', account_login = false

const router = express.Router()

const secretkey = "thisisthekey"

router.post('/login', async (req, res) => {
	const email = req.body.email
	const password = req.body.password
    // search for the account return { isValid: bool! , account: account }
	// if login data is not valid, account remain empty
	const account = await User.findOne({ email })
	if(!account) {
		res.send({ 
			isValid: false, 
			msg: "This account does not exist"
		});
	}
	else {
		if (bcrypt.compareSync(password, account.password)){
			const user = {
				nickname: account.nickname,
				email: account.email,
				likeRecipes: account.likeRecipes
			}
			jwt.sign({user}, secretkey, (err, token) => {
				res.status(200).send({ 
					isValid: true,
					nickname: account.nickname,
					token: token
				})
			});
		}		
		else {
			res.send({ 
				isValid: false,
				msg: "Wrong password"
			});	
		}
	}
	
});

router.post('/logout', (req, res) => {
	// account_login = false
	// account_email = ""
  res.status(200).send('account logout')
});

router.post('/signUp', async (req, res) => {
  const nickname = req.body.nickname
	const email = req.body.email
	const password = bcrypt.hashSync(req.body.password, 8);
    // check if the email has been registered return { isValid: bool! }

	const data = await User.findOne({ email: email });
	if (data) {
		res.send({ 
			isValid: false, 
			msg: "This email address is already used"
		});
	}

	else {
		const user = {
			nickname: nickname,
			email: email,
			password: password,
			likeRecipes: []
		}
		await User.create(user)
		jwt.sign({user}, secretkey, (err, token) => {			
			res.status(200).send({ 
				isValid: true,
				token: token
			})
		});
	}
});

export default router;