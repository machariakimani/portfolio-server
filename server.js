require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const app = express()
const {logger} = require("./middleware/logEvents")
const {errorHandle} = require("./middleware/logEvents")
const connectDB = require("./config/dbConns")
const corsOptions = require("./config/corsOptions")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 3500

app.use(cors(corsOptions))
connectDB()
app.use(logger)
app.use(cookieParser())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"))
app.use('/uploads', express.static('uploads'));
app.use("/", require("./routes/rootRoute"))
app.use("/auth", require("./routes/authRoute"))
app.use("/users", require("./routes/usersRoute"))
app.use("/contacts", require("./routes/contactsRoute"))
app.use("/projects", require("./routes/projectsRoute"))
app.use("/services", require("./routes/servicesRoute"))
app.use("/skills", require("./routes/skillsRoute"))
app.use("/hero", require("./routes/heroRoute"))
app.use("/upload", require("./routes/uploadRoute"))
//app.use("/messages", require("./routes/messageRoute"))
//app.use("/estimates", require("./routes/estimateRoute"))


app.all(/^.*$/, (req, res ) => {
	res.status(404)
	if(req.accepts("html")){
		res.sendFile(path.join(__dirname, "views", "404.html"))
	} else if(req.accepts("json")) {
		res.json({message: "resource not found"})
	} else {
		res.send("404 not found")
}
})

app.use(errorHandle)

mongoose.connection.once("open", () => {
	app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
	console.log("connected to mongo db")
	
})

mongoose.connection.on("error", err => {
	console.error(err);
	logger(`${err.no}: ${err.code} \t ${err.syscall} \t ${err.hostname} `, "mongoErrLog.txt")
})
