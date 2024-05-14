const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patient_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["M", "F", "Other"],
    required: true,
  },
  medical_conditions: {
    type: [String],
    required: true,
  },
  medications: {
    type: [String],
    required: true,
  },
  allergies: {
    type: [String],
    required: true,
  },
  blood_type: {
    type: String,
    required: true,
  },
  BMI: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  Current_Disease: {
    type: String,
    default: "None",
  },
  Mental_Health_Condition: {
    type: [String],
  },
  Current_Diagnosis: {
    type: String,
  },
  last_appointment: {
    date: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  place_of_birth: {
    type: String,
    required: true,
  },
  past_surgeries: {
    type: [String],
  },
  lab_tests: {
    type: [String],
  },
});

const physicianSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model("patients", patientSchema);
const Physician = mongoose.model("physicians", physicianSchema);

module.exports = {
  Patient,
  Physician,
};
