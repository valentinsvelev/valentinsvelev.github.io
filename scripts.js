
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to adjust font sizes based on window width
function adjustFontSize() {
    const h1 = document.querySelector('h1');
    const windowWidth = window.innerWidth;

    if (windowWidth <= 600) {
        h1.style.fontSize = '18px'; // Mobile size
    } else if (windowWidth > 600 && windowWidth <= 768) {
        h1.style.fontSize = '20px'; // Tablet size
    } else {
        h1.style.fontSize = '30px'; // Desktop size
    }
}

// Run the function on page load
window.addEventListener('load', adjustFontSize);

// Run the function on window resize
window.addEventListener('resize', adjustFontSize);
