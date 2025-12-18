// External modules/packages:
import {
	Schema,
	model,
} from 'mongoose';

// Creating members schema:
const memberSchema = new Schema({
	memberName: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},

	address: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 200,
	},

	// we will be storing it in form of string
	phone: {
		type: String,
		required: true,
		minLength: 10,
		maxLength: 15,
	},

	email: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},

	// subscription date start
	subsDateStart: {
		type: Date,
		required: true,
	},

	// subscription date end
	subsDateEnd: {
		type: Date,
		required: true,
		validate: {
			validator: function (value) {
				// 'this' is the document; 'value' is the current field's value
				return this.subsDateStart < value;
			},
			message: 'End date must be after start date!'
		}
	},

	// number of books issued (every member will be issued max 10 books)
	issuedBooks: {
		type: Number,
		required: true,
		min: 0,
		max: 10,
		default: 0,
	},
}, { timestamps: true });

// `runValidators: true` is most useful for any MongoDB/Mongoose update function (for validators) (search runValidators in validation section of mongoose):
const options = {
	runValidators: true,
};

// Creating Member Model:
const Member = model('Member', memberSchema);

// Exporting Member Model:
export default Member;

// exporting options object and will be used when needed
export {
	options,
};

// The options export is fine, but in real projects it usually lives closer to the update call, not the model file. For practice, this is acceptable.
// So when you create update functionality, try to make the options there locally, and maybe you can then delete from here.