const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const { Patient, Physician } = require("./db");

require("dotenv").config();

const app = express();
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

mongoose.connect(
  "mongodb+srv://MedAiAdmin:admin@medaicluster.ruzyfzy.mongodb.net/medai?retryWrites=true&w=majority&appName=MedAiCluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://MedAiAdmin:admin@medaicluster.ruzyfzy.mongodb.net/medai?retryWrites=true&w=majority&appName=MedAiCluster",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect("/");
  }
}

app.get("/", async function (req, res) {
  res.render("login.njk");
});

app.post("/", async function (req, res) {
  console.log("we are logging in!!!");
  console.log("body ", req.body);
  if (!req.body.username || !req.body.password) {
    res.render("login.njk", {
      error_message: "Missing username and/or password",
    });
    console.log("Missing username and/or password");
    return;
  }
  const physician = await Physician.findOne({ Username: req.body.username });
  if (!physician) {
    res.render("login.njk", { error_message: "Bad username" });
    console.log("Bad username");
  } else {
    if (bcrypt.compareSync(req.body.password, physician.Password)) {
      req.session.user = physician;

      if (req.body.rememberMe) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
      } else {
        req.session.cookie.expires = false;
      }

      res.redirect("/dashboard");
    } else {
      res.render("login.njk", { error_message: "Incorrect password" });

      console.log("Incorrect password");
    }
  }
});

app.get("/dashboard", isAuthenticated, async function (req, res) {
  try {
    const patient = await Patient.findOne();
    if (!patient) {
      return res.status(404).send("No patients found");
    }

    const savedPatientID = req.cookies.savedPatientID;

    if (!savedPatientID) {
      res.cookie("savedPatientID", patient.patient_id);
    }

    res.redirect(`/dashboard/${savedPatientID || patient.patient_id}`);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/dashboard/:patientId", isAuthenticated, async function (req, res) {
  const patientId = req.params.patientId;
  try {
    const patient = await Patient.findOne({ patient_id: patientId });
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    const patients = await Patient.find();
    res.render("dashboard.njk", { patient: patient, patients: patients });
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/settings", isAuthenticated, async function (req, res) {
  res.render("settings.njk");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/patients/:id", async function (req, res) {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findOne({ patient_id: patientId });
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).send("Internal Server Error");
  }
});
