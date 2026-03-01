// importing external module/packages:
import {
  Schema,
  model,
} from 'mongoose';

// creating the organization schema:
const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// creating the organization schema model:
const Organization = model('Organization', organizationSchema);

// exporting organization model:
export default Organization;