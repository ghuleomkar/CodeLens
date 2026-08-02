require("dotenv").config();
const express = require("express");
const cors = require("cors");
const repositoryRoutes = require("./routes/repositoryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

//middleware
// app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/repository", repositoryRoutes);


//Test Route
app.get("/",(req,res) => {
    res.json({
        success:true,
        message: "AI GitHub Code Reviewer Backend is running",
    });
});

module.exports = app;