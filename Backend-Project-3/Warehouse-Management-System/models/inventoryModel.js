// external packages/modules:
import mongoose, { Schema } from 'mongoose';

// creating the schema:
const inventorySchema = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	warehouseId: {
		type: Schema.Types.ObjectId,
		ref: 'Warehouse',
		required: true,
	},
	quantityAvailable: {
		type: Number,
		required: true,
	},
	quantityReserved: {
		type: Number,
		required: true,
	},
	reorderLevel: {
		type: Number,
		required: true,
	},
	lastRestockedAt: {
		type: Date,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const Inventory = mongoose.model('Inventory', inventorySchema);

// exporting the model:
export default Inventory;