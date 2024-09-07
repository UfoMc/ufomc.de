function checkZoom() {
    const zoomLevel = Math.round(window.devicePixelRatio * 100);

    console.log(zoomLevel);

    if (zoomLevel >= 125) {
        document.getElementById('zoomOverlay').style.display = 'flex';
    } else {
        document.getElementById('zoomOverlay').style.display = 'none';
    }
}

window.addEventListener('resize', checkZoom);
window.addEventListener('load', checkZoom);