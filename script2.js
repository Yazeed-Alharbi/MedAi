const { Patient } = require("./db");

async function updateMedicationsFormat() {
  const patients = await Patient.find(); 
  const variants = [
    {
      last_appointment: {
        date: "2023-06-15",
        institution: "County Clinic",
        city: "New York",
        title: "Follow-up Consultation",
        description: "Discussion about medication adjustments."
      },
      place_of_birth: "New York",
      past_surgeries: ["Knee Surgery"],
      lab_tests: ["Cholesterol Test", "X-ray"],
      mental_health_conditions: ["Depression", "PTSD"]
    },
    {
      last_appointment: {
        date: "2023-08-20",
        institution: "City Hospital",
        city: "Washington",
        title: "Annual Physical Exam",
        description: "Comprehensive examination for overall health status."
      },
      place_of_birth: "Washington, D.C.",
      past_surgeries: ["Gallbladder Removal"],
      lab_tests: ["Thyroid Function Test", "MRI"],
      mental_health_conditions: ["Depression", "Bipolar Disorder"]
    },
    {
      last_appointment: {
        date: "2023-09-25",
        institution: "County Clinic",
        city: "Miami",
        title: "Medication Review",
        description: "Discussion about potential side effects."
      },
      place_of_birth: "Miami",
      past_surgeries: ["Hip Replacement"],
      lab_tests: ["Liver Function Test", "CT Scan"],
      mental_health_conditions: ["Depression", "Schizophrenia"]
    },
    {
      last_appointment: {
        date: "2023-10-30",
        institution: "City Hospital",
        city: "Metropolis",
        title: "Specialist Referral",
        description: "Consultation with a cardiologist for heart health assessment."
      },
      place_of_birth: "Los Angeles",
      past_surgeries: ["Hernia Repair"],
      lab_tests: ["Electrocardiogram", "Bone Density Test"],
      mental_health_conditions: ["Depression", "Obsessive-Compulsive Disorder"]
    }
  ];
  
  

  // Loop through each patien

  try {
    // Fetch all patients from the database
    const patients = await Patient.find(); 
    
    // Loop through each patient
    for (const patient of patients) {
      console.log(`Updating patient ${patient.patient_id}`);
      // Select a random variant index
      const randomIndex = Math.floor(Math.random() * variants.length);
      // Get the random variant
      const randomVariant = variants[randomIndex];
      // Update the patient with the random variant data
      await Patient.updateOne({ _id: patient._id }, { $set: { 
        Mental_Health_Condition: randomVariant.mental_health_conditions } });
      console.log('Random variant added successfully');
    }

    console.log('Random variants added successfully for all patients');
  } catch (error) {
    console.error('Error adding random variant:', error);
  }

}


updateMedicationsFormat();

