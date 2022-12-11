const Job = require("../models/Job");
const { NotFoundError } = require("../errors");
const jwt = require("jsonwebtoken");
const createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.userId });
  res.status(201).json({ job, msg: "successfully created job" });
};
const getJob = async (req, res) => {
  const { id } = req.params;
 const job = await Job.findOne({ _id: id });

  if (!job) {
    throw new NotFoundError(`No job found with id: ${id}`);
  }
  res.status(200).json({ job, msg: "result found" });
};
const getAllJobs = async (req, res) => {
  const { userId } = req;
  const jobs = await Job.find({ createdBy: userId });
  res.status(200).json({ msg: "success", jobs, resultCount: jobs.length });
};
const updateJob = async (req, res) => {
  const {
    params: { id },
  } = req;
  const job = await Job.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new NotFoundError("No job found with the id " + id);
  }
  console.log(job);
  res.status(200).json({ msg: "update successful", job });
};
const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    throw new NotFoundError("No user found with the id " + id);
  }
  res.status(200).json({ msg: "successfully deleted", job });
};
module.exports = { createJob, getJob, deleteJob, updateJob, getAllJobs };
