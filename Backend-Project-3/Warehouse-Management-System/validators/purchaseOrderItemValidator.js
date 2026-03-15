// External modules/packages:
import Joi from 'joi';

// creating the validation schema:
const schema = Joi.object({
  purchaseOrderId: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  productId: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  quantityOrdered: Joi.number()
    .positive()
    .required(),
  unitPrice: Joi.number()
    .positive()
    .required(),
  totalPrice: Joi.number()
    .positive()
    .required(),
});

// exporting the schema:
export default schema;