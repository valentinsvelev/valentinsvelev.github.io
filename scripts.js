
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

// Responsiveness
window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var headerContainer = document.querySelector('.header-container');
    var navToggle = document.querySelector('.nav-toggle');
    var container = document.querySelector('.header-info');
    var container_h1 = container.querySelector('h1');
    var container_p = container.querySelector('p');
    var titleText = document.querySelector('.title-text');
    var footer = document.querySelector('.footer');

    // Adjust font sizes and center header text
    if (width < 768) {
        headerContainer.style.textAlign = 'center';
        container_h1.style.fontSize = '30px';
        container_p.style.fontSize = '18px';
        titleText.style.fontSize = '22px';
        footer.style.fontSize = '15px';
    }

    // Center hamburger button
    navToggle.style.margin = 'auto';
});

// Select the hamburger button and the nav element
var navToggle = document.querySelector('.nav-toggle');
var headerNav = document.querySelector('.header-nav');

// Add a click event listener to the hamburger button
navToggle.addEventListener('click', function() {
    // Toggle the "active" class on the header nav element
    headerNav.classList.toggle('active');
});
