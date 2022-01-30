import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Recipe_schema = new Schema({
	ownerEmail: {
		type: String,
		required: true
	},
	recipeName: {
		type: String,
		required: true
	},
	recipeImg: {
		type: String,
		required: false
	},
	ingredients: {
		type: [String],
		required: true
	},
	step: {
		type: [String],
		required: false
	},
	like: {
		type: Number,
		required: false
	}
})

const Recipe = mongoose.model('recipe', Recipe_schema)

export {Recipe}