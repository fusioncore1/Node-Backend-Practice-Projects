// importing external packages/modules:
import mongoose from 'mongoose';

// creating the invoice schema:
const invoiceSchema = new mongoose.Schema({
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ['Draft', 'Sent', 'Paid'],
		required: true,
	},
	organizationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Organization',
		required: true,
	},
	createdBy: {               // it stores the user id who created it
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
}, { timestamps: true });

// creating the invoice model:
const Invoice = mongoose.model('Invoice', invoiceSchema);

// exporting the invoice model:
export default Invoice;