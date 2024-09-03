const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

let issues = [
  { id: 1, title: "Issue 1", description: "This is the first issue" },
  { id: 2, title: "Issue 2", description: "This is another issue" },
  { id: 3, title: "Issue 3", description: "This is the third issue" },
];

app.post("/issues", (req, res) => {
  const newIssue = req.body;
  issues.push(newIssue);
  console.log("Created:", newIssue);
  res.status(201).send(newIssue);
});

app.get("/issues", (req, res) => {
  res.json(issues);
});

app.put("/issues/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedIssue = req.body;
  issues = issues.map((issue) => (issue.id === id ? updatedIssue : issue));
  console.log("Updated:", updatedIssue);
  res.send(updatedIssue);
});

app.delete("/issues/:id", (req, res) => {
  const id = parseInt(req.params.id);
  issues = issues.filter((issue) => issue.id !== id);
  console.log("Deleted Issue with ID:", id);
  res.status(204).send();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
