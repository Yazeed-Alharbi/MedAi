const express = require("express");
const cors = require("cors");
const nunjucks = require("nunjucks");
const cookieParser = require('cookie-parser');
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
const { Patient, Physician } = require("./db");
// middelware
app.use(cors());
app.use(cookieParser());
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
    // Fetch all patients
    const patient = await Patient.findOne();
    if (!patient) {
      return res.status(404).send("No patients found");
    }

    // Check if the patient ID is stored in a cookie
    const savedPatientID = req.cookies.savedPatientID;

    // If the patient ID is not already saved in a cookie, save it
    if (!savedPatientID){
      res.cookie('savedPatientID', patient.patient_id);
    }

    // Redirect to the dashboard with the saved patient ID
    res.redirect(`/dashboard/${savedPatientID || patient.patient_id}`);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/dashboard/:patientId", async function (req, res) {
  const patientId = req.params.patientId;
  try {
    // Fetch the details of the selected patient by ID
    const patient = await Patient.findOne({ patient_id: patientId });
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    const patients = await Patient.find();
    // Render the dashboard template with the selected patient's details
    res.render("dashboard.njk", { patient: patient, patients: patients});
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
