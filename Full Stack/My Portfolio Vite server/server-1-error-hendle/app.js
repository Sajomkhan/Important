const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");

// Import Router
const errorHandler = require('./middleware/error');
const userRouter = require("./routers/userRouter")
const projectRouter = require("./routers/projectRouter")
const techRouter = require('./routers/techRouter')
const aboutRouter = require('./routers/aboutRouter')
const experienceRouter = require('./routers/experienceRouter')
const educationRouter = require('./routers/educationRouter')
const introductionRouter = require('./routers/introductionRouter')

// Middleware
app.use(express.json())
app.use(express.urlencoded({extented: true}));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// API End Point
app.use("/api/user", userRouter)
app.use("/api/project", projectRouter)
app.use("/api/tech", techRouter)
app.use("/api/about", aboutRouter)
app.use("/api/experience", experienceRouter)
app.use("/api/education", educationRouter)
app.use("/api/introduction", introductionRouter)

//error middleware
app.use(errorHandler);

module.exports = app