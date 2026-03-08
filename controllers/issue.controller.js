const { isValidObjectId } = require("mongoose");
const Issue = require("../models/issue.model.js");

async function createIssue(req, res) {
  try {
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAllIssues(req, res) {
  try {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let search = req.query.search;
    // console.log(search);
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }
    if (!page) page = 1;
    if (!limit) limit = 5;

    let skip = (page - 1) * limit;
    const result = await Issue.find(filter).skip(skip).limit(limit);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getIssueById(req, res) {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Please provide valid ID" });
  }

  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    return res.status(200).json(issue);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong while fetching the data" });
  }
}
async function updateIssue(req, res) {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Enter valid ID" });
  }
  //This is to check the req.body is empty or not
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "The update can not be empty" });
  }

  try {
    //Run Validators is to perform schema check, new is to return the updated object.... Mongoose only accepts one options object so wrap them inside
    const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedIssue) {
      return res
        .status(404)
        .json({ message: "Issue with this ID doesn't exist" });
    }
    return res.status(200).json({ updatedIssue });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong!", err });
  }
}

async function deleteIssue(req, res) {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Please enter a valid ID" });
  }

  try {
    const deletedIssue = await Issue.findByIdAndDelete(id);
    if (!deletedIssue) {
      return res
        .status(404)
        .json({ message: "The issue with id doesn't exist" });
    }

    return res
      .status(200)
      .json({ message: "The issue is deleted", deletedIssue });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
