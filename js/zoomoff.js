// Prevent Keyboard ZOOM
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && 
      (e.key === '+' || 
       e.key === '-' || 
       e.key === '0' || 
       e.key === '=')) {
    e.preventDefault();
  }
});

// Prevent Mouse Wheel ZOOM
document.addEventListener('wheel', function(e) {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });

// Extra Protection
window.addEventListener('resize', () => {
  document.body.style.zoom = "100%";
});