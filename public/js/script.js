document.addEventListener("DOMContentLoaded", function () {
  let colorModeIcon = document.getElementById("color-mode-icon");
  let loginBackgroundLogo = document.getElementById("logo");
  let showPasswordToggle = document.getElementById("show-password-toggle");
  let passwordInput = document.getElementById("password");
  let settingsDarkModeSwitch = document.getElementById("darkModeSwitch");
  let settingsBulbIcon = document.getElementById("bulb-icon");
  let settingsAboutUsIcon = document.getElementById("about-us-icon");
  let settingsNotificationIcon = document.getElementById("notification-icon");
  let dashboardPage = document.getElementsByClassName("dashboard-body")[0]

  function darkModeSetter() {
    let isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.body.classList.toggle("dark-mode", isDarkMode);
      if (document.body.classList.contains("login-body")) {
        colorModeIcon.src = "images/lightmode_icon.png";
        loginBackgroundLogo.src = "images/MedAi_logo_light.png";
      }
      if (document.body.classList.contains("settings-body")) {
        settingsBulbIcon.src = "images/bulb_dark.png";
        settingsAboutUsIcon.src = "images/about_us_icon_dark.png";
        settingsNotificationIcon.src = "images/notification_icon_dark.png";
        settingsDarkModeSwitch.checked = true;
      }
    } else {
      if (document.body.classList.contains("login-body")) {
        colorModeIcon.src = "images/darkmode_icon.png";
        loginBackgroundLogo.src = "images/MedAi_logo_dark.png";
      }
      if (document.body.classList.contains("settings-body")) {
        settingsBulbIcon.src = "images/bulb_light.png";
        settingsAboutUsIcon.src = "images/about_us_icon_light.png";
        settingsNotificationIcon.src = "images/notification_icon_light.png";
        settingsDarkModeSwitch.checked = false;
      }
      document.body.classList.toggle("dark-mode", isDarkMode);
    }
  }
  darkModeSetter();
  if (colorModeIcon) {
    colorModeIcon.onclick = function () {
      let isDarkMode = localStorage.getItem("darkMode") === "true";

      if (isDarkMode) {
        localStorage.setItem("darkMode", "false");
      } else {
        localStorage.setItem("darkMode", "true");
      }
      darkModeSetter();
    };
  }
  if (settingsDarkModeSwitch) {
    settingsDarkModeSwitch.addEventListener("change", function () {
      if (settingsDarkModeSwitch.checked) {
        localStorage.setItem("darkMode", "true");
      } else {
        localStorage.setItem("darkMode", "false");
      }
      darkModeSetter();
    });
  }

  if (showPasswordToggle) {
    showPasswordToggle.addEventListener("click", function () {
      const isPasswordVisible = passwordInput.getAttribute("type") === "text";
      passwordInput.setAttribute(
        "type",
        isPasswordVisible ? "password" : "text"
      );

      if (isPasswordVisible) {
        showPasswordToggle.classList.remove("fa-eye-slash");
        showPasswordToggle.classList.add("fa-eye");
      } else {
        showPasswordToggle.classList.remove("fa-eye");
        showPasswordToggle.classList.add("fa-eye-slash");
      }
    });
  }
  if (dashboardPage){
    document.getElementById('patient-listbox').addEventListener('change', function() {
      const selectedPatientId = this.value;
      
      document.cookie = `savedPatientID=${selectedPatientId}; path=/`;
      
      window.location.href = `/dashboard/${selectedPatientId}`;
  });
  
  const savedPatientID = getCookie('savedPatientID');

  
  if (savedPatientID) {
      const patientListbox = document.getElementById('patient-listbox');
      patientListbox.value = savedPatientID;
  }

  
  function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
  }
  }
});
