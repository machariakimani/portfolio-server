const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	messageText: {
		type : String,
		required: true
	},
	email: {
		type : String,
		required: true
	},	
	phone: {
		type : String,
		required: true
	},	
	seen :{
		type: Boolean,
		default :false		
	}
},
{timestamps : true}  
)

module.exports = mongoose.model("Messages", messageSchema)