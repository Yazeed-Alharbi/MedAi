const express = require("express");
const cors = require("cors");
const nunjucks = require("nunjucks");
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
const { Patient, Physician } = require("./db");
// middelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

// async function displayPatients() {
//   try {
//     const patients = await Patient.find();
//     console.log("patients:", patients);
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//   }
// }

// displayPatients();

// #TODO: Add authentication
app.get("/", async function (req, res) {
  res.render("login.njk");
});

app.get("/dashboard", async function (req, res) {
  try {
    // Fetch the first patient
    const patient = await Patient.findOne(); // Modify as needed to fetch specific patient
    console.log(patient.medications);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    // Render the dashboard template with the patient data
    res.render("dashboard.njk", { patient: patient });
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/settings", async function (req, res) {
  res.render("settings.njk");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
