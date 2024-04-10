document.addEventListener("DOMContentLoaded", function(){
    let colorModeIcon = document.getElementById("color-mode-icon");
    let loginBackgroundImage = document.querySelector(".col.image-overlay img:nth-of-type(1)");
    let loginBackgroundLogo = document.querySelector(".col.image-overlay img:nth-of-type(2)");
    
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
});
