const mongoose = require("mongoose");
const { patientSchema, physicianSchema } = require("./models/db_schema");

const uri =
  "mongodb+srv://MedAiAdmin:admin@medaicluster.ruzyfzy.mongodb.net/medai?retryWrites=true&w=majority&appName=MedAiCluster";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, clientOptions)
  .then(() =>
    console.log("Successfully connected to the 'medai' database on MongoDB!")
  )
  .catch((err) => console.error("Connection error:", err));

const Patient = mongoose.model("patients", patientSchema);
const Physician = mongoose.model("physicians", physicianSchema);

module.exports = { Patient, Physician };
