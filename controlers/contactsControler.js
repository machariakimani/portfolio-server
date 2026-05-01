const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

const getAllContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find().lean();
	if (!contacts?.length) {
		return res.status(200).json([]);
	}
	res.json(contacts);
});

const addContact = asyncHandler(async (req, res) => {
	const { phoneNumber, email, instagram, github } = req.body;

	const contactObject = { phoneNumber, email, instagram, github };
	const contact = await Contact.create(contactObject);

	if (contact) {
		res.status(201).json({ message: `Contact created successfully` });
	} else {
		res.status(400).json({ message: "Invalid contact data received" });
	}
});

const updateContact = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { phoneNumber, email, instagram, github } = req.body;

	if (!id) {
		return res.status(400).json({ message: "ID is required" });
	}

	const contact = await Contact.findById(id).exec();
	if (!contact) {
		return res.status(404).json({ message: "Contact not found" });
	}

	if (phoneNumber !== undefined) contact.phoneNumber = phoneNumber;
	if (email !== undefined) contact.email = email;
	if (instagram !== undefined) contact.instagram = instagram;
	if (github !== undefined) contact.github = github;

	const updatedContact = await contact.save();
	res.json({ message: `Contact updated successfully` });
});

const deleteContact = asyncHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ message: "Contact ID is required" });
	}

	const contact = await Contact.findById(id).exec();
	if (!contact) {
		return res.status(404).json({ message: "Contact not found" });
	}

	await contact.deleteOne();
	res.json({ message: `Contact deleted successfully` });
});

module.exports = {
	getAllContacts,
	addContact,
	updateContact,
	deleteContact
};
