// Simple utility functions for static site
console.log("Aishite static site loaded");

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize site
window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded and ready");
});