
// Highlight current website
document.addEventListener("DOMContentLoaded", function() {
    // Normalize the current path
    const currentPath = window.location.pathname.replace(/\/$/, '').replace(/\/index\.\w+$/, '');
    const navLinks = document.querySelectorAll("#nav-menu li a");

    navLinks.forEach((link) => {
        // Normalize the link's path
        const linkPath = link.pathname.replace(/\/$/, '').replace(/\/index\.\w+$/, '');

        if (linkPath === currentPath) {
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
