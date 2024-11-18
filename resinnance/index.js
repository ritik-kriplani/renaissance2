// JavaScript to toggle 'active' class on images
const images = document.querySelectorAll(".grid img");

images.forEach((img) => {
    img.addEventListener("click", () => {
        // Remove 'active' class from all images
        images.forEach((image) => image.classList.remove("active"));
        // Add 'active' class to clicked image
        img.classList.add("active");
    });
});
// script.js

// Wait for 5 seconds, then hide the intro and show the main content
setTimeout(() => {
    // Hide the intro wrapper
    const introWrapper = document.getElementById("intro-wrapper");
    introWrapper.style.opacity = "0";

    // Smooth transition
    setTimeout(() => {
        introWrapper.style.display = "none";

        // Scroll to the top and show main content
        window.scrollTo(0, 0);
        const mainContent = document.getElementById("main-content");
        mainContent.style.display = "block";
    }, 1000); // Matches the fade-out animation
}, 7000); // 5 seconds for intro
