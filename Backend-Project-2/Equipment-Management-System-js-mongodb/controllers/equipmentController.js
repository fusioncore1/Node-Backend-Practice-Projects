// Internal Packages/Modules:
import Equipment from '../models/equipmentModel.js';

// Controller function to add equipment data:
const addEquipment = async (req, res, next) => {
	try {
		// getting data from `req.validatedData` without any need for imports:
		const data = req.validatedData;

		// getting the equipment name and equipment serial number:
		const equipmentUniqueData = { name: data.name, serialNumber: data.serialNumber }

		// checking if the equipment exists:
		const equipmentExists = await Equipment.findOne(equipmentUniqueData);

		// if equipment doesn't exists, we will create the one:
		if (!equipmentExists) {
			// creating new data in the database:
			const equipment = new Equipment(data);

			// saving data in mongodb (db operations always need to be in async-await):
			await equipment.save();
		} else {
			return res.status(409).send({
				message: 'Equipment already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: {
				EquipmentName: data.name,
				SerialNumber: data.serialNumber,
			},
			message: 'Equipment added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get all equipments data:
const getAllEquipments = async (req, res, next) => {
	try {
		// getting all equipment data from the equipments collection or table:
		const allEquipments = await Equipment.find();

		// if no equipment exists:
		if (!allEquipments) {
			return res.status(404).send({
				message: 'No data found for equipments',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allEquipments,
			message: 'All equipments fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get equipment data by id:
const getEquipmentById = async (req, res, next) => {
	try {
		// getting equipment id from the request parameters:
		const equipmentDataId = req.params.id;

		// getting the equipment data from the equipments collection or table by id:
		const equipmentById = await Equipment.findById(equipmentDataId);

		// if no equipment data exists:
		if (!equipmentById) {
			return res.status(404).send({
				message: `Equipment by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: equipmentById,
			message: 'Equipment by id fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to update equipment data by id:
const updateEquipmentById = async (req, res, next) => {
	try {
		// getting equipment id from the request parameters:
		const equipmentId = req.params.id;

		// getting the updated data from the user:
		const updatedData = req.validatedData;

		// getting equipment data from the equipment collection or table and updating it:
		const updateEquipment = await Equipment.findByIdAndUpdate(
			equipmentId,
			updatedData,
			{ new: true, runValidators: true }
		);

		// if the equipment data is not found and updated:
		if (!updateEquipment) {
			return res.status(404).send({
				message: 'Equipment not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updateEquipment,
			message: 'Equipment updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to delete equipment data by id:
const deleteEquipmentById = async (req, res, next) => {
	try {
		// getting equipment id from the request parameters:
		const equipmentId = req.params.id;

		// getting data by equipment id from the equipments collections or table and deleting it:
		const deleteEquipment = await Equipment.findByIdAndDelete(equipmentId);

		// if data is not found and deleted:
		if (!deleteEquipment) {
			return res.status(404).send({
				message: 'Equipment not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deleteEquipment,
			message: 'Equipment data deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Exporting all the controller functions:
export {
	addEquipment,
	getAllEquipments,
	getEquipmentById,
	updateEquipmentById,
	deleteEquipmentById,
};