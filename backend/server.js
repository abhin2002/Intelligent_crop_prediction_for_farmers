const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/DBConnection.js")
const userRoutes = require("./routes/userRoutes.js")
const communityRoutes = require("./routes/communityRoutes.js")
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js")
const messageRoutes = require("./routes/messageRoutes.js")

const app = express()
app.use(express.json()) // accept JSON file

dotenv.config() // helps to read the env file
connectDB() // IN config/db.js

app.use("/user",userRoutes)
app.use("/community",communityRoutes)
app.use("/message",messageRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT,console.log("Server Started on PORT ",PORT));