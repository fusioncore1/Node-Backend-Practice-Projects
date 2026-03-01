// importing external modeuls/packages:
import {
	Schema,
	model,
} from 'mongoose';

// creating project schema:
const projectSchema = new Schema({
	name: {         // name of the project
		type: String,
		required: true,
	},
	organizationId: {
		type: Schema.Types.ObjectId,
		ref: 'Organization',
		required: true,
	},
	createdBy: {                      // it stores the user id who created it
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
}, { timestamps: true });

// creating project model:
const Project = model('Project', projectSchema);

// exporting the project model:
export default Project;