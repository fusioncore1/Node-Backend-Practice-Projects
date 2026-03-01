// internal module/package:
import Organization from '../models/organizationModel.js';

// Controller function to add organizations:
const addOrganization = async (req, res, next) => {
	try {
		// getting validated data from `req.validatedData`
		const data = req.validatedData;

		// getting organization name
		const orgName = { name: data.name };

		// checking if the organization by this name already exists:
		const organizationExists = await Organization.findOne(orgName);

		// if the organization doesn't exist:
		if (!organizationExists) {
			// creating the data:
			const organization = new Organization(data);

			// saving data in mongodb (db operations are always in async-await):
			await organization.save();
		} else {
			// if the organization exists:
			return res.status(409).send({       // 409 is status code for data confliction
				message: 'Organization already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({      // 201 is status code for successful data receipt
			data: data,
			message: 'Organization created successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get all organizations:
const getAllOrganizations = async (req, res, next) => {
	try {
		// getting all the data from organization collection or table:
		const allOrganizations = await Organization.find();

		// if no data exists:
		if (!allOrganizations) {
			return res.status(404).send({
				message: 'No data found for organization',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allOrganizations,
			message: 'All Organizations fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get organization by id:
const getOrganizationById = async (req, res, next) => {
	try {
		// getting organization id from the request parameters:
		const organizationId = req.params.id;

		// getting organization data by id from the organizations collection or table:
		const organizationDataById = await Organization.findById(organizationId);

		// if organization by id isn't found:
		if (!organizationDataById) {
			return res.status(404).send({
				message: `Organization by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: organizationDataById,
			message: 'Organization found',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to update organization by id:
const updateOrganizationById = async (req, res, next) => {
	try {
		// getting organization id from the request parameters:
		const organizationId = req.params.id;

		// getting the update data from the user's request body:
		const updateOrganizationData = req.body;

		// getting organization data by id from the organizations collection or table and updating it:
		const updatedOrganization = await Organization.findByIdAndUpdate(
			organizationId,
			updateOrganizationData,
			{ new: true, runValidators: true },
		);

		// if the organization data is not found by id and updated:
		if (!updatedOrganization) {
			return res.status(404).send({
				message: `Organization by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedOrganization,
			message: 'Organization found by id and updated',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to delete organization by id:
const deleteOrganizationById = async (req, res, next) => {
	try {
		// getting organization's id from request parameters:
		const organizationId = req.params.id;

		// getting data from organizations collection or table by id and deleting it:
		const deletedOrganization = await Organization.findByIdAndDelete(organizationId);

		// if organization is not found and deleted:
		if (!deletedOrganization) {
			return res.status(404).send({
				message: `Organization by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletedOrganization,
			message: 'Organization by id found and deleted',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addOrganization,
	getAllOrganizations,
	getOrganizationById,
	updateOrganizationById,
	deleteOrganizationById,
};