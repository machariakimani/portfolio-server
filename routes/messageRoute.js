const express = require("express")
const router = express.Router()
const messagesControler  = require("../controlers/messagesControler")
const verifyJWT = require("../middleware/verifyJWT")

router.route("/")
.post(messagesControler.createMessage)

router.use(verifyJWT)

router.route("/")
.get(messagesControler.getAllMessages)

router.route("/:id")
.delete(messagesControler.deleteMessage)

router.route("/:id/read")
.patch(messagesControler.updateMessage)
 

module.exports = router