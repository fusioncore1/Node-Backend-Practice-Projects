// External Modules/Packages:
import Joi from 'joi';

// creating the validation schema:
const schema = Joi.object({
  userId: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  equipmentId: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  startDate: Joi.date()
    .required(),
  endDate: Joi.date()
    .greater(Joi.ref('startDate'))
    .required(),
  actualReturnDate: Joi.date()
    .greater(Joi.ref('startDate')),
  status: Joi.string()
    .min(6)
    .max(10)
    .required(),
  totalCost: Joi.number()
    .required(),
});

// exporting the validation schema:
export default schema;