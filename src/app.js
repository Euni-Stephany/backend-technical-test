const express = require("express");

const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running",
  });
});

app.use("/users", userRoutes);

module.exports = app;
