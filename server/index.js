require("dotenv").config({ path: "./.env" });
const userRoutes = require("./routes/users");
const { errorHandler } = require("./middleware/errorHandler");
const PORT = process.env.PORT;
const express = require("express");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
