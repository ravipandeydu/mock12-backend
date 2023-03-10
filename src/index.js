const express = require("express");
const cors = require("cors");
const {jobRoutes} = require("./routes/jobs.route")

const { connection } = require("./config/db");

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(cors());

app.use("/jobs", jobRoutes)

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connnecting to DB");
    console.log(err);
  }
  console.log(`listening on PORT ${PORT}`);
});
