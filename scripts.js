
// Highlight current website
document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll("#nav-menu li a");

    navLinks.forEach((link) => {
        const linkHref = link.href;

        // Check if the current location matches the link's href or it's the home page
        if (linkHref === currentLocation || (currentLocation.endsWith('/') && linkHref.endsWith('/about'))) {
            link.classList.add("active");
        }
    });
});

// Download button
document.querySelectorAll(".downloadBtn").forEach(function(button) {
    button.addEventListener("click", function() {
        // Get the download link and filename from the data attributes
        const href = this.getAttribute("data-href");
        const filename = this.getAttribute("data-filename");
        
        // Create a temporary anchor element to trigger the download
        const link = document.createElement("a");
        link.href = href;
        link.download = filename;
        
        // Append the link to the body, trigger the download, and remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

// Responsive navbar
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function() {
    // Toggle the "change" class for the hamburger animation
    hamburger.classList.toggle("change");

    // Toggle the visibility of the nav menu
    navMenu.classList.toggle("show");
});
