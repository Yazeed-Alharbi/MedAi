const { Patient } = require("./db");

async function updateMedicationsFormat() {
  const patients = await Patient.find(); // Fetch all patients

  patients.forEach(async (patient) => {
    if (
      patient.medications.length === 1 &&
      patient.medications[0].startsWith("['") &&
      patient.medications[0].endsWith("']")
    ) {
      // Attempt to parse the string into an array
      try {
        const meds = JSON.parse(patient.medications[0].replace(/'/g, '"'));
        patient.medications = meds;
        await patient.save();
        console.log(`Updated medications for patient ${patient._id}`);
      } catch (error) {
        console.error(
          `Failed to parse medications for patient ${patient._id}:`,
          error
        );
      }
    }
  });
}

updateMedicationsFormat();
