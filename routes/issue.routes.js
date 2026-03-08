const issueController = require("../controllers/issue.controller.js");
const express = require("express");
const router = express.Router();

router.post("/", issueController.createIssue);

router.get("/", issueController.getAllIssues);

router.get("/:id", issueController.getIssueById);

router.put("/:id", issueController.updateIssue);

router.delete("/:id", issueController.deleteIssue);
module.exports = router;
