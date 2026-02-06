// External Modules/Packages:
import mongoose,
{
	Schema,
	model
} from 'mongoose';

// Internal Modules/Packages:
import { endAfterStartValidate } from './rentalModel.js';

// creating the schema:
const maintenanceLogSchema = new Schema({
	equipmentId: {
		type: Schema.Types.ObjectId,
		ref: 'Equipment',
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	startDate: {
		type: Date,
		required: true,
	},

	endDate: {
		type: Date,
		validate: {
			validator: endAfterStartValidate,
			message: 'End date should be after start date'
		},
		required: true,
	},
}, { timestamps: true });

// // creating a validation function for making sure endDate is after startDate:
// function endAfterStartValidate(value) {
// 	// 'this' refers to the current document:
// 	value > this.startDate;
// }

// creating the model:
const MaintenanceLog = model('Maintenance_Log', maintenanceLogSchema);

// exporting the model:
export default MaintenanceLog;