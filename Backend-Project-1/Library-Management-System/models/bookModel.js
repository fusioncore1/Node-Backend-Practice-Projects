// External packages/modules:
import mongoose from 'mongoose';

// Creating books schema:
const bookSchema = new mongoose.Schema({
	bookName: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	authorName: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	edition: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 100,
	},
	noOfPages: {
		type: Number,
		required: true,
		min: 1,
		max: 3000,
	},
	totalCopies: {
		type: Number,
		required: true,
		min: 1,
		max: 20,
	},
	availableCopies: {
		type: Number,
		required: true,
		min: 0,
		max: 20,
		validate: {
			validator: function (value) {
				// 'this' is the document; 'value' is the current field's value
				return this.totalCopies >= value;
			},
			message: 'availableCopies cannot be greater than totalCopies',
		},
	},
}, { timestamps: true });

// `runValidators: true` is most useful for any MongoDB/Mongoose update function (for validators) (search runValidators in validation section of mongoose):
const options = {
	runValidators: true,
};

// creating model (we are passing name in string as singular, but mongoose will make it into plural):
const Book = mongoose.model('Book', bookSchema);

// exporting Book model:
export default Book;

// exporting options object and will be used when needed:
export {
	options,
};

// The options export is fine, but in real projects it usually lives closer to the update call, not the model file. For practice, this is acceptable.
// So when you create update functionality, try to make the options there locally, and maybe you can then delete from here.