const express = require("express");
const cors = require("cors");
const nunjucks = require("nunjucks");
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

app.get("/", async function (req, res) {
  res.render("login.njk");
});

// #TODO: Add authentication
app.get("/dashboard", async function (req, res) {
  res.render("dashboard.njk");
});
app.get("/settings", async function (req, res) {
  res.render("settings.njk");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
