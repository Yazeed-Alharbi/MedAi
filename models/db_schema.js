const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patient_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    medical_conditions: {
        type: Array,
        default: []
    },
    medications: {
        type: Array,
        default: []
    },
    allergies: {
        type: Array,
        default: []
    },
    last_appointment_date: {
        type: String,
    },
    blood_type: {
        type: String
    },
    BMI: {
        type: Number
    },
    age: {
        type: Number
    },
    Current_Disease: {
        type: String
    },
    Mental_Health_Condition: {
        type: String
    },
    Current_Diagnosis: {
        type: String
    }
});

const physicianSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const Patient = mongoose.model('Patient', patientSchema);
const Physician = mongoose.model('Physician', physicianSchema);

module.exports = {
    Patient,
    Physician
};
