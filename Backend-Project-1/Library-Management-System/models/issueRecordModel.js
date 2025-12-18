// External modules/packages:
import {
	Schema,
	model
} from 'mongoose';

// Creating issueRecord Schema:
const issueRecordSchema = new Schema({
	issueDate: {
		type: Date,
		required: true,
	},

	returnDate: {
		type: Date,
		validate: {
			validator: function (value) {
				// 'this' is the document; 'value' is the current field's value:
				return this.issueDate < value;
			},
			message: 'returnDate must be after issueDate!',
		},
	},

	bookId: {
		type: Schema.Types.ObjectId,
		ref: 'Book',
		required: true,
	},

	memberId: {
		type: Schema.Types.ObjectId,
		ref: 'Member',
		required: true,
	},

	status: {
		type: String,
		enum: ['issued', 'returned'],
		required: true,
	}
}, { timestamps: true });

// `runValidators: true` is most useful for any MongoDB/Mongoose update function (for validators) (search runValidators in validation section of mongoose):
const options = {
	runValidators: true,
}

// Creating Issues Model:
const Issue = model('Issue', issueRecordSchema);

// Exporting Issue Model:
export default Issue;

// exporting options object and will be used when needed:
export {
	options,
};

// The options export is fine, but in real projects it usually lives closer to the update call, not the model file. For practice, this is acceptable.
// So when you create update functionality, try to make the options there locally, and maybe you can then delete from here.