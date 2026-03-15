// Two names for this module: Purchase Orders and Incoming Stock:

// external packages/modules:
import mongoose from 'mongoose';

// creating the schema:
const purchaseOrderSchema = new mongoose.Schema({
	vendorId: {
		type: Schema.Types.ObjectId(),
		ref: 'PurchaseOrder',
		required: true,
	},
	warehouseId: {
		type: Schema.Types.ObjectId(),
		ref: 'Warehouse',
		required: true,
	},
	orderDate: {
		type: Date,
		required: true,
	},
	expectedDeliveryDate: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: ['Pending', 'Shipped', 'Received', 'Cancelled'],
		required: true,
	},                // Pending / Shipped / Received / Cancelled
	totalAmount: {
		type: Number,
		required: true,
	},
	notes: {
		type: String,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const PurchaseOrder = mongoose.model('Purchase_Order', purchaseOrderSchema);

// exporting the model:
export default PurchaseOrder;