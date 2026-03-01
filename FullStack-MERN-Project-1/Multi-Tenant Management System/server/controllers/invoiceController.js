// internal modules/packages:
import Invoice from '../models/invoiceModel.js';

// Controller function for adding invoice data:
const addInvoice = async (req, res, next) => {
	try {
		// getting validated data from `req.validatedData`:
		const data = req.validatedData;

		// getting projectId and organizationId for uniqueness:
		const invoiceUniqueData = { projectId: data.projectId, organizationId: data.organizationId };

		// checking if the invoice exists:
		const invoiceExists = await Invoice.findOne(invoiceUniqueData);

		// if the invoice doesn't exist, we'll create the one:
		if (!invoiceExists) {
			// creating the new data in the database:
			const invoice = new Invoice(data);

			// saving data in mongodb (db operations always need to be in async-await):
			await invoice.save();
		} else {
			// if the invoice exists:
			return res.status(409).send({   // error code 409 is for confliction of data
				message: 'Invoice already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({         // status code 201 is sent when data is received properly
			data: {
				ProjectId: data.projectId,
				OrganizationId: data.organizationId,
			},
			message: 'Invoice created successfully',
			success: false,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get all the invoice data:
const getAllInvoices = async (req, res, next) => {
	try {
		// getting all the data from the invoices collection or table:
		const allInvoices = await Invoice.find();

		// if no invoice exists:
		if (!allInvoices) {
			return res.status(404).send({
				message: 'No data found for invoices',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allInvoices,
			message: 'All invoices fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get the invoice data by id:
const getInvoiceById = async (req, res, next) => {
	try {
		// getting invoice id from the request parameters:
		const invoiceId = req.params.id;

		// getting data from the invoices collection or table:
		const invoiceById = await Invoice.findById(invoiceId);

		// if the invoice doesn't exist:
		if (!invoiceById) {
			return res.status(404).send({
				message: `Invoice by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: invoiceById,
			message: 'Invoice by Id found',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to update the invoice data by id:
const updateInvoiceById = async (req, res, next) => {
	try {
		// getting invoice id from the request parameters:
		const invoiceId = req.params.id;

		// getting data from user:
		const updatedInvoiceData = req.body;

		// getting data from the invoices collections or table and updating it:
		const updatedInvoice = await Invoice.findByIdAndUpdate(
			invoiceId,
			updatedInvoiceData,
			{ new: true, runValidators: true },
		);

		// if the invoice is not found and updated:
		if (!updatedInvoice) {
			return res.status(404).send({
				message: `Invoice by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedInvoice,
			message: 'Invoice by id found and updated',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to delete the invoice data by id:
const deleteInvoiceById = async (req, res, next) => {
	try {
		// getting invoice id from the request parameters:
		const invoiceId = req.param.id;

		// getting data from the invoices collections or table and deleting it:
		const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

		// if the invoice is not found and deleted:
		if (!deletedInvoice) {
			return res.status(404).send({
				message: `Invoice by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletedInvoice,
			message: 'Invoice by id found and deleted',
			success: false,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addInvoice,
	getAllInvoices,
	getInvoiceById,
	updateInvoiceById,
	deleteInvoiceById,
};