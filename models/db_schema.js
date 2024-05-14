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
    required: true,
  },
  place_of_birth: {
    type: String,
  },
  medical_conditions: {
    type: [String],
    default: [],
  },
  medications: {
    type: Array,
    default: [],
  },
  allergies: {
    type: Array,
    default: [],
  },
  last_appointment: {
    type: {
      date: {
        type: String,
      },
      institution: {
        type: String,
      },
      city: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      }
    },
    default: null,
  },
  blood_type: {
    type: String,
  },
  BMI: {
    type: Number,
  },
  age: {
    type: Number,
  },
  Current_Disease: {
    type: String,
  },
  Mental_Health_Condition: {
    type: Array,
    default: [],
  },
  lab_tests: {
    type: Array,
    default: [],
  },
  past_surgeries: {
    type: Array,
    default: [],
  },
  Current_Diagnosis: {
    type: String,
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
