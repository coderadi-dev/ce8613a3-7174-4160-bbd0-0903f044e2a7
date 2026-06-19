// ==================================================
// ELEMENT REFERENCE
// ==================================================

const loader = document.querySelector(".loader");
const main = document.querySelector("main");

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO HIDE THE LOADER AFTER 5 SECONDS
function hideLoader() {
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";
        main.style.transform = "translateY(0)";
        main.style.opacity = "1";
    }, 7000);
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & INITIAL DISPLAY SETTINGS
document.addEventListener("DOMContentLoaded", hideLoader);