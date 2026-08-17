// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('interactive-img');
    
    // Safety check: ensure the element exists on the current page before adding logic
    if (img) {
        img.addEventListener('click', () => {
            img.classList.toggle('zoomed');
        });
    }
});
