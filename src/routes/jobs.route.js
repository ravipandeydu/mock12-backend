const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JobModel } = require("../models/Job.model");

const jobRoutes = Router();

jobRoutes.get("/", async (req, res) => {
  const jobs = await JobModel.find();
  res.send(jobs);
});

jobRoutes.post("/create", async (req, res) => {
  const newJob = new JobModel(req.body);
  try {
    await newJob.save();
    res.send(newJob);
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

jobRoutes.delete("/delete/:listId", async (req, res) => {
  const { jobId } = req.params;
  const deletedJob = await JobModel.findOneAndDelete({
    _id: jobId,
  });
  if (deletedJob) {
    res.status(200).send("Deleted");
  } else {
    res.send("couldn't delete");
    console.log(err);
  }
});

jobRoutes.patch("/edit/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const updatedJob = await JobModel.findOneAndUpdate(
    { _id: jobId },
    req.body
  );
  if (updatedJob) {
    res.send(updatedJob);
  } else {
    res.send("couldn't update");
  }
});

module.exports = {
  jobRoutes,
};
