// importing external packages/modules:
import mongoose from 'mongoose';

// creating user schema:
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['Owner', 'Admin', 'Member', 'Accountant'],
		required: true,
	},
	organizationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization',
		required: true,
	},
}, { timestamps: true });

// creating the model:
const User = mongoose.model('User', userSchema);

// exporting the model:
export default User;