// external packages/modules:
import {
	Schema,
	model
} from 'mongoose';

// creating the warehouse schema:
const warehouseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	capacity: {
		type: Number,
		required: true,
	},
	managerName: {
		type: String,
		required: true,
	},
	contactNumber: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
		required: true,
	},
}, { timestamps: true });

// creating the warehouse model:
const Warehouse = model('Warehouse', warehouseSchema);

// exporting the model:
export default Warehouse;