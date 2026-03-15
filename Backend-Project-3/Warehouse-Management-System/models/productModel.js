// external packages/modules:
import { Schema, model } from 'mongoose';

// creating the schema:
const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	sku: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	vendorId: {
		type: Schema.Types.ObjectId(),
		ref: 'Vendor',
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	unitPrice: {
		type: Number,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	dimensions: {
		type: Number,
		required: true,
	},
	barcode: {
		type: String,
		required: true,
	},
	isFragile: {
		type: Boolean,
		required: true,
	},
}, { timestamps: true });

// creating the model:
const Product = model('Product', productSchema);

// exporting the model:
export default Product;