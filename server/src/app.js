require("dotenv").config();
const express = require("express");
const cors = require("cors");
const repositoryRoutes = require("./routes/repositoryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/repository", repositoryRoutes);


//Test Route
app.get("/",(req,res) => {
    res.json({
        sucess:true,
        message: "AI GitHub Code Reviewer Backend is running",
    });
});

module.exports = app;