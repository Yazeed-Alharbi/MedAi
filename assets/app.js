document.addEventListener("DOMContentLoaded", function(){
    let colorModeIcon = document.getElementById("color-mode-icon");
    let loginBackgroundImage = document.querySelector(".col.image-overlay img:nth-of-type(1)");
    let loginBackgroundLogo = document.querySelector(".col.image-overlay img:nth-of-type(2)");
    let showPasswordToggle = document.getElementById("show-password-toggle");
    const passwordInput = document.getElementById('password');
    
    colorModeIcon.onclick = function(){
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")){
            colorModeIcon.src = "assets/lightmode_icon.png";
            loginBackgroundImage.src = "assets/background_image_dark.png";
            loginBackgroundLogo.src ="assets/MedAi_logo_light.png";
        }
        else{
            colorModeIcon.src = "assets/darkmode_icon.png";  
            loginBackgroundImage.src = "assets/background_image_light.png";
            loginBackgroundLogo.src ="assets/MedAi_logo_dark.png";
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
