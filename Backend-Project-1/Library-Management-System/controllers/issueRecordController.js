// importing internal modules:
import Issue from '../models/issueRecordModel.js';

// controller function to add issued book records:
const addIssuedBook = async (req, res, next) => {
	try {
		// getting data from `req.validatedData` without any need for imports:
		const data = req.validatedData;

		// getting issueDate, bookId, memberId:
		const issueDate = data.issueDate;
		const bookId = data.bookId;
		const memberId = data.memberId;

		// checking if issueRecord exists:
		const issueRecordExists = await Issue.findOne({ issueDate, bookId, memberId });

		// if issueRecord doesn't exist, we will add the data:
		if (!issueRecordExists) {
			// creating new data in mongoose:
			const issueRecord = new Issue(data);

			// saving data into MongoDB:
			await issueRecord.save();
		}
		else {
			return res.status(409).send({
				message: 'Issue Record already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({
			data: {
				issueDate: data.issueDate,
				bookId: data.bookId,
				memberId: data.memberId,
			},
			message: 'Issue Record added successfully',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to get all issued book records:
const getAllIssuedBooks = async (req, res, next) => {
	try {
		// getting all issued books from collection or table:
		const allIssuedBooks = await Issue.find();

		// sending response:
		res.status(200).send({
			data: allIssuedBooks,
			message: 'All Issued Books Records fetched successfully',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to get issued book records by id:
const getIssuedBookById = async (req, res, next) => {
	try {
		// `Issued Books Records` this is what we are talking about, so you can you any name interchangeably (still take care in name of variables)

		// getting id from url params:
		const issuedRecordId = req.params.id;

		// getting data from issuedRecords collection or table based on id:
		const issuedRecordsById = await Issue.findById(issuedRecordId);

		// if we can't find member by id:
		if (!issuedRecordsById) {
			return res.status(404).send({
				message: 'Issued book record not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: issuedRecordsById,
			message: 'Issued book record found',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to update issued book records by id:
const updateIssuedBookById = async (req, res, next) => {
	try {
		// getting issuedBookRecordId from url params:
		const issuedBookRecordId = req.params.id;

		// getting updated data from user:
		const updatedData = req.validatedData;

		// getting data from issue books records collection or table based on id and updating it:
		const updatedIssuedBookRecord = await Issue.findByIdAndUpdate(
			issuedBookRecordId,
			updatedData,
			{ new: true, runValidators: true }
		);

		// if data is not found and updated:
		if (!updatedIssuedBookRecord) {
			return res.status(404).send({
				message: 'Issued book record not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedIssuedBookRecord,
			message: 'Issued book record updated successfully',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to delete issued book records by id:
const deleteIssuedBookById = async (req, res, next) => {
	try {
		// getting issuedBookRecordId from url params:
		const issuedRecordBookId = req.params.id;

		// getting data from issued books records collection or table and deleting it:
		const deletedIssuedRecordBook = await Issue.findByIdAndDelete(issuedRecordBookId);

		// if data is not found and deleted:
		if (!deletedIssuedRecordBook) {
			return res.status(404).send({
				message: 'Issued book record not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletedIssuedRecordBook,
			message: 'Issued book record is deleted',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addIssuedBook,
	getAllIssuedBooks,
	getIssuedBookById,
	updateIssuedBookById,
	deleteIssuedBookById,
};