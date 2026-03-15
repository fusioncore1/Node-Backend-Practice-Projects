// internal packages/models:
import mongoose from 'mongoose';

// creating the schema:
const shipmentItemSchema = new mongoose.Schema({
	shipmentId: {
		type: Schema.Types.ObjectId(),
		ref: 'Shipment',
		required: true,
	},
	productId: {
		type: Schema.Types.ObjectId(),
		ref: 'Product',
		required: true,
	},
	quantityShipped: {
		type: Number,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const ShipmentItem = mongoose.model('Shipment_Item', shipmentItemSchema);

// exporting the model:
export default ShipmentItem;