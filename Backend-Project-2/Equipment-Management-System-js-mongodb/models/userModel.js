// importing external modules/packages:
import mongoose,
{
	Schema,
	model,
} from 'mongoose';

// creating the schema:
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,    // starts unique index here
	},

	role: {
		type: String,
		required: true,
		enum: ['Admin', 'Staff', 'Customer'],
	},

	isActive: {
		type: Boolean,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const User = model('User', userSchema);

// exporting the model:
export default User;