require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");
const express = require("express");
const PORT = process.env.PORT;
const userRoutes = require("./routes/users");

const app = express();

let client;

const main = async () => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.6dacjt9.mongodb.net/?retryWrites=true&w=majority`;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

main().catch(console.error);

app.use("/api", userRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = {
  client,
};
