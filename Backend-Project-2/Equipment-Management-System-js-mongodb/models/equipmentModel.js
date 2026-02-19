// External modules/packages:
import mongoose from 'mongoose';

// creating the schema:
const equipmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {         // if get time, you can create a new collection/table for this equipment-category
		type: String,
		required: true,
	},
	serialNumber: {
		type: String,
		required: true,
		unique: true,
	},
	status: {
		type: String,
		enum: ['Available', 'Rented', 'Maintenance'],
		required: true,
	},
	dailyRate: {
		type: Number,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const Equipment = mongoose.model('Equipment', equipmentSchema);

// exporting the model:
export default Equipment;