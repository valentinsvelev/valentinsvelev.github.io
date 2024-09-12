
// Highlight current website
document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll("#nav-menu li a");

    navLinks.forEach((link) => {
        if (link.href === currentLocation) {
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

// Responsive iframes (PDF preview frames)
// Function to adjust the zoom level for a given iframe
function adjustPdfZoom(iframe, pdfFile) {
    if (window.innerWidth < 768) {
        iframe.src = pdfFile + "#zoom=50"; // Zoom out on smaller screens
    } else {
        iframe.src = pdfFile + "#zoom=100"; // Default zoom on larger screens
    }
}

// Adjust zoom for all iframes with the class 'pdf'
function adjustAllPdfs() {
    const pdfFrames = document.querySelectorAll(".pdf"); // Select all iframes with class "pdf"

    // Loop through each iframe and adjust the zoom
    pdfFrames.forEach((iframe, index) => {
        const pdfFile = iframe.src; // Get the PDF file URL without zoom parameter
        adjustPdfZoom(iframe, pdfFile); // Adjust zoom for each iframe
    });
}

// Adjust zoom level on page load and window resize
window.addEventListener('load', adjustAllPdfs);
window.addEventListener('resize', adjustAllPdfs);
