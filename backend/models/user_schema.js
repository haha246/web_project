import mongoose from 'mongoose'
const Schema = mongoose.Schema

const user_schema = new Schema({
	nickname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	likeRecipes: {
		type: [String],
		required: false
	}
})


const User = mongoose.model('user', user_schema)

export {User}