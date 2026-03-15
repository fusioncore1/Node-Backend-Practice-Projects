// external packages/modules:
import {
	Schema,
	model,
} from 'mongoose';

// creating the schema:
const purchaseOrderItemSchema = new Schema({
	purchaseOrderId: {
		type: Schema.Types.ObjectId(),
		ref: 'PurchaseOrder',
		required: true,
	},
	productId: {
		type: Schema.Types.ObjectId(),
		ref: 'Product',
		required: true,
	},
	quantityOrdered: {
		type: Number,
		required: true,
	},
	unitPrice: {
		type: Number,
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const PurchaseOrderItem = model('Purchase_Order_Item', purchaseOrderItemSchema);

// exporting the model:
export default PurchaseOrderItem;