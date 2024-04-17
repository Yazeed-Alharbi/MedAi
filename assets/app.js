document.addEventListener("DOMContentLoaded", function(){
    let colorModeIcon = document.getElementById("color-mode-icon");
    let loginBackgroundLogo = document.getElementById("logo");
    let showPasswordToggle = document.getElementById("show-password-toggle");
    let passwordInput = document.getElementById('password');
    let settingsDarkModeSwitch = document.getElementById('darkModeSwitch');
    let settingsBulbIcon = document.getElementById("bulb-icon");
    let settingsAboutUsIcon = document.getElementById("about-us-icon");
    let settingsNotificationIcon = document.getElementById("notification-icon");

    function darkModeSetter(){
        let isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode){

            document.body.classList.toggle("dark-mode", isDarkMode);
            if (window.location.pathname.includes("/login.html")){
                colorModeIcon.src = "assets/lightmode_icon.png";
                loginBackgroundLogo.src ="assets/MedAi_logo_light.png";
            }
            if (window.location.pathname.includes("/setting.html")){

                settingsBulbIcon.src = "assets/bulb_dark.png";
                settingsAboutUsIcon.src = "assets/about_us_icon_dark.png";
                settingsNotificationIcon.src = "assets/notification_icon_dark.png"
                settingsDarkModeSwitch.checked = true;
            }
        }
        else{
            if (window.location.pathname.includes("/login.html")){
                colorModeIcon.src = "assets/darkmode_icon.png";  
                loginBackgroundLogo.src ="assets/MedAi_logo_dark.png";
            }
            if (window.location.pathname.includes("/setting.html")){
                settingsBulbIcon.src = "assets/bulb_light.png";
                settingsAboutUsIcon.src = "assets/about_us_icon_light.png";
                settingsNotificationIcon.src = "assets/notification_icon_light.png"
                settingsDarkModeSwitch.checked = false;
            }
            document.body.classList.toggle("dark-mode", isDarkMode);
        }
    }
    darkModeSetter();
    if (colorModeIcon){
    colorModeIcon.onclick = function(){
        let isDarkMode = localStorage.getItem("darkMode") === "true";

        if(isDarkMode){
            localStorage.setItem("darkMode", "false");

            
        }
        else{
            localStorage.setItem("darkMode", "true");
            
            
        }
        darkModeSetter();
    }
}
    if (settingsDarkModeSwitch){
        settingsDarkModeSwitch.addEventListener("change", function(){

            if (settingsDarkModeSwitch.checked){
                localStorage.setItem("darkMode", "true"); 
            }
            else{
                localStorage.setItem("darkMode", "false");  
            }
            darkModeSetter();
        });
        
    }
    
    if (showPasswordToggle){
    showPasswordToggle.addEventListener('click', function() {
        const isPasswordVisible = passwordInput.getAttribute('type') === 'text';
        passwordInput.setAttribute('type', isPasswordVisible ? 'password' : 'text');

        if (isPasswordVisible) {
            showPasswordToggle.classList.remove('fa-eye-slash');
            showPasswordToggle.classList.add('fa-eye');
        } else {
            showPasswordToggle.classList.remove('fa-eye');
            showPasswordToggle.classList.add('fa-eye-slash');
        }
});
    }

});
