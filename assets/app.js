document.addEventListener("DOMContentLoaded", function(){
    let colorModeIcon = document.getElementById("color-mode-icon");
    let loginBackgroundLogo = document.getElementById("logo");
    let showPasswordToggle = document.getElementById("show-password-toggle");
    const passwordInput = document.getElementById('password');
    
    function darkModeSetter(){
        let isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode){

            document.body.classList.toggle("dark-mode", isDarkMode);
            if (window.location.pathname.includes("/login.html")){
                colorModeIcon.src = "assets/lightmode_icon.png";
                loginBackgroundLogo.src ="assets/MedAi_logo_light.png";
            }
        }
        else{
            if (window.location.pathname.includes("/login.html")){
                
                colorModeIcon.src = "assets/darkmode_icon.png";  
                loginBackgroundLogo.src ="assets/MedAi_logo_dark.png";
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

});
