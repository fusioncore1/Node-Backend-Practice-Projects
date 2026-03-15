// external packages/modules:
import mongoose from 'mongoose';

// creating the vendor schema:
const vendorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	contactPerson: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	address: {
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
	gstNumber: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
		required: true,
	},
}, { timestamps: true });

// creating the vendor model:
const Vendor = mongoose.model('Vendor', vendorSchema);

// exporting the vendor model:
export default Vendor;