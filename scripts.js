
// Highlight current website
document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll("nav ul li a");

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
