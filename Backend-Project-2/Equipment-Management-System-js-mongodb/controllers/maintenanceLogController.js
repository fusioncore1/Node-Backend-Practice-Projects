// External Modules/Packages:
import MaintenanceLog from '../models/maintenanceLogModel.js';

// Controller function to add the maintenance log data:
const addMaintenanceLog = async (req, res, next) => {
	try {
		// getting data from `req.validatedData` without any need for imports:
		const data = req.validatedData;

		// getting equipmentId, startDate and endDate:
		const maintenanceLogUniqueData = { equipmentId: data.equipmentId, startDate: data.startDate, endDate: data.endDate }

		// checking if the maintenance data exists:
		const maintenanceDataExists = await MaintenanceLog.findOne(maintenanceLogUniqueData);

		// if maintenanceLogData doesn't exists, we will create the one:
		if (!maintenanceDataExists) {
			// creating new data in the database:
			const maintenanceLog = new MaintenanceLog(data);

			// saving data in mongodb (db operations always need to be in async-await):
			await maintenanceLog.save();
		} else {
			return res.status(409).send({
				message: 'This log data already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: {
				EquipmentId: data.equipmentId,
				startDate: data.startDate,
				endDate: data.endDate,          // professional way to write 'endDate: endDate' is 'endDate'
			},
			message: 'Maintenance Log Data added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get all the maintenance log data:
const getAllMaintenanceLogs = async (req, res, next) => {
	try {
		// getting all the maintenance log data from the maintenance logs collection or table:
		const allMaintenanceLogs = await MaintenanceLog.find();

		// if no maintenance logs exists:
		if (!allMaintenanceLogs) {
			return res.status(404).send({
				message: 'No maintenance logs found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allMaintenanceLogs,
			message: 'All the maintenance logs fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get the maintenance log data by id:
const getMaintenanceLogById = async (req, res, next) => {
	try {
		// getting maintenance log id from the request parameters:
		const maintenanceLogId = req.params.id;

		// getting the maintenance log data from the maintenance logs collection or table:
		const maintenanceLogData = await MaintenanceLog.findById(maintenanceLogId);

		// if no maintenance log data exists:
		if (!maintenanceLogData) {
			return res.statsu(404).send({
				message: `Maintenance Log of this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: maintenanceLogData,
			message: 'Maintenance Log by id fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to update the maintenance log data by id:
const updateMaintenanceLogById = async (req, res, next) => {
	try {
		// getting maintenance log id from the request parameters:
		const maintenanceLogId = req.params.id;

		// getting updated data from the user:
		const updatedData = req.validatedData;

		// getting maintenance log data from the maintenance logs collection or table and updating it:
		const updatedMaintenanceLog = await MaintenanceLog.findByIdAndUpdate(
			maintenanceLogId,
			updatedData,
			{ new: true, runValidators: true }
		);

		// if the maintenance data is not found and updated:
		if (!updatedMaintenanceLog) {
			return res.status(404).send({
				message: 'Maintenance log not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedMaintenanceLog,
			message: 'Maintenance Log updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to delete the maintenance log data by id:
const deleteMaintenanceLogById = async (req, res, next) => {
	try {
		// getting maintenance log id from the request parameters:
		const maintenanceLogId = req.params.id;

		// getting maintenance log data from the maintenance logs collection or table and deleting it:
		const deleteMaintenanceLog = await MaintenanceLog.findByIdAndDelete(maintenanceLogId);

		// if maintenanceLogData not found and deleted:
		if (!deleteMaintenanceLog) {
			return res.status(404).send({
				message: 'Maintenance Log not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteMaintenanceLog,
			message: 'Maintenance Log successfully deleted',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Exporting all the controller functions:
export {
	addMaintenanceLog,
	getAllMaintenanceLogs,
	getMaintenanceLogById,
	updateMaintenanceLogById,
	deleteMaintenanceLogById,
}