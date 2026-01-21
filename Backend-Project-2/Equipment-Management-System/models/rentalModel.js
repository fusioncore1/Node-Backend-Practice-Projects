// External Modules/Packages:
import mongoose from 'mongoose';

// creating the schema:
const rentalSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	equipmentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Equipment',
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		validate: {
			validator: endAfterStartValidate(value),
			message: 'End date must be after start date.',
		},
		required: true,
	},
	actualReturnDate: {                // this isn't required if customer hasn't returned equipment
		type: Date,
		validate: {
			validator: endAfterStartValidate(value),
			message: 'Actual return date must be after start date.',
		}
	},
	status: {
		type: String,
		enum: ['Active', 'Completed', 'Overdue', 'Cancelled'],
		required: true,
	},
	totalCost: {
		type: Number,
		required: true,
	},
}, { timestamps: true });

// creating a validation function for making sure endDate is after startDate:
function endAfterStartValidate(value) {
	// 'this' refers to the current document
	value > this.startDate;
}

// creating the model:
const Rental = mongoose.model('Rental', rentalSchema);

// exporting the model:
export default Rental;

// exporting the validation function:
export {
	endAfterStartValidate,
}