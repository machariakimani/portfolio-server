const contactsControler = require("../controlers/contactsControler");
const express = require("express");
const router = express.Router();

router.route("/")
	.get(contactsControler.getAllContacts)
	.post(contactsControler.addContact);

router.route("/:id")
	.patch(contactsControler.updateContact)
	.delete(contactsControler.deleteContact);

module.exports = router;
