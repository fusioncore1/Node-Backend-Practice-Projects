// This module has two names: Shipments and Outgoing Orders

// external modules/packages:
import {
	Schema,
	model,
} from 'mongoose';

// creating the schema:
const shipmentSchema = new Schema({
	warehouseId: {
		type: Schema.Types.ObjectId(),
		ref: 'Warehouse',
		required: true,
	},
	shipmentDate: {
		type: Date,
		required: true,
	},
	destination: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ['Pending', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
		required: true,
	},          // Pending / Packed / Shipped / Delivered / Cancelled
	trackingNumber: {
		type: String,
		required: true,
	},
	carrier: {
		type: String,
		requried: true,
	},
	notes: {
		type: String,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const Shipment = model('Shipment', shipmentSchema);

// exporting the schema:
export default Shipment;