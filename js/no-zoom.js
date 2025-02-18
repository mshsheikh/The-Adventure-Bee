// Extreme zoom prevention system
(function () {
  // Create zoom container
  const zoomContainer = document.createElement("div");
  zoomContainer.id = "zoom-container";

  // Move all body elements into the container
  while (document.body.firstChild) {
    zoomContainer.appendChild(document.body.firstChild);
  }
  document.body.appendChild(zoomContainer);

  // Viewport meta enforcement
  const viewportMeta = document.createElement("meta");
  viewportMeta.name = "viewport";
  viewportMeta.content =
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no";
  document.head.appendChild(viewportMeta);

  // Zoom detection and prevention system
  let lastZoomLevel = window.devicePixelRatio;

  function enforceZoom() {
    const currentZoom = window.devicePixelRatio;

    if (currentZoom !== lastZoomLevel) {
      const scale = 1 / currentZoom;
      zoomContainer.style.transform = `scale(${scale})`;
      zoomContainer.style.width = `${100 / scale}%`;
      zoomContainer.style.height = `${100 / scale}%`;
    }

    lastZoomLevel = currentZoom;
    document.documentElement.style.zoom = "1";
  }

  // Continuous zoom monitoring
  const rescaleObserver = new ResizeObserver(() => {
    enforceZoom();
    document.documentElement.style.zoom = "1";
    document.body.style.zoom = "1";
  });

  rescaleObserver.observe(document.documentElement);

  // Event listeners for various zoom attempts
  function preventZoom(e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  // Add event listeners
  document.addEventListener("wheel", preventZoom, { passive: false });
  document.addEventListener("keydown", preventZoom);
  document.addEventListener("gesturestart", (e) => e.preventDefault());
  document.addEventListener("dblclick", (e) => e.preventDefault());

  // Initial enforcement
  enforceZoom();
  setInterval(enforceZoom, 1000);
  window.addEventListener("resize", enforceZoom);
  window.addEventListener("orientationchange", enforceZoom);

  // iOS specific prevention
  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
})();
