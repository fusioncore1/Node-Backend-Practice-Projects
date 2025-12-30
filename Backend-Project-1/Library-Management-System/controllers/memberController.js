// importing internal modules:
import Member from '../models/memberModel.js';

// controller function to add members:
const addMember = async (req, res, next) => {
	try {
		// getting data from `req.validatedData` without any need for imports:
		const data = req.validatedData;

		// getting name for finding:
		const memberName = data.memberName;

		// checking if the member exists:
		const memberExists = await Member.findOne({ memberName });

		// if member name doesn't exist, we will add member info:
		if (!memberExists) {
			// creating a new data in mongoose:
			const member = new Member(data);

			// saving data in mongodb:
			await member.save();
		}
		else {
			return res.status(409).send({
				message: 'Member already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: {
				memberName: data.memberName,
				phone: data.phone,
				email: data.email,
			},
			message: 'Member added successfully',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to get all member data:
const getAllMembers = async (req, res, next) => {
	try {
		// getting all members from collection or table:
		const allMembers = await Member.find();

		// sending response:
		res.status(200).send({
			data: allMembers,
			message: 'All members fetched successfully',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to get member data by id:
const getMemberById = async (req, res, next) => {
	try {
		// getting id from url params:
		const memberId = req.params.id;

		// getting data from members collection or table based on member id:
		const memberDataById = await Member.findById(memberId);

		// if we can't find a member by id:
		if (!memberDataById) {
			return res.status(404).send({
				message: 'Member not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: memberDataById,
			message: 'Member found',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to update member data by id:
const updateMemberById = async (req, res, next) => {
	try {
		// getting id from url params:
		const memberId = req.params.id;

		// getting updated data from user:
		const updatedData = req.validatedData;

		// getting data from members collection or table based on id and updating it:
		const updatedMember = await Member.findByIdAndUpdate(
			memberId,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if data is not found and updated: 
		if (!updatedMember) {
			return res.status(404).send({
				message: 'Member not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedMember,
			message: 'Member updated successfully',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to delete member data by id:
const deleteMemberById = async (req, res, next) => {
	try {
		// getting id from url params:
		const memberId = req.params.id;

		// getting data from members collections or table based on id and deleting it:
		const deletedMember = await Member.findByIdAndDelete(memberId);

		// if data is not found and deleted:
		if (!deletedMember) {
			return res.status(404).send({
				message: 'Member not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletedMember,
			message: 'Member data is deleted',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addMember,
	getAllMembers,
	getMemberById,
	updateMemberById,
	deleteMemberById,
};