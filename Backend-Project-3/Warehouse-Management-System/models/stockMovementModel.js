// external packages/modules:
import mongoose from 'mongoose';

// creating the schema:
const stockMovementSchema = new mongoose.Schema({
	productId: {
		type: Schema.Types.ObjectId(),
		ref: 'Product',
		required: true,
	},
	warehouseId: {
		type: Schema.Types.ObjectId(),
		ref: 'Warehouse',
		required: true,
	},
	type: {
		type: String,
		enum: ['Inbound', 'Outbound', 'Adjustment'],
		required: true,
	},           // Inbound / Outbound / Adjustment
	referenceType: {
		type: String,
		enum: ['Purchase_Order', 'Shipment', 'Manual'],
		required: true,
	},    // Purchase_Order / Shipment / Manual
	referenceId: {
		type: String,
		required: true,
	},
	quantityChanged: {
		type: Number,
		required: false,
		default: 0,
	},
	previousQuantity: {
		type: Number,
		required: false,
		default: 0,
	},
	newQuantity: {
		type: Number,
		required: true,
	},
	movementDate: {
		type: Date,
		required: true,
	},
	notes: {
		type: String,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const stockMovement = mongoose.model('Stock_Movement', stockMovementSchema);

// exporting the model:
export default stockMovement;