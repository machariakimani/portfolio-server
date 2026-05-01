const usersControler = require("../controlers/usersControler")
const express = require("express")
const router = express.Router()
//const verifyJWT = require("../middleware/verifyJWT")

//router.use(verifyJWT)
router.route("/") 
.get(usersControler.getAllUsers)
.post(usersControler.addUser)

router.route("/:id")
.patch(usersControler.updateUser)
.delete(usersControler.deleteUser)

 module.exports = router