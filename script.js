//load page
window.onload = () => {

    const closeButton = document.getElementById("pcButton");
    const mobileButton = document.getElementById("mobileButton");
    
    mobileButton.onclick = function() {

        window.location.href = "mobile/index.html";

    }

    closeButton.onclick = function() {      
        
        checkZoom();
        window.addEventListener('resize', checkZoom);

        document.getElementById('overlay').style.display = 'none';

        /*  slide animation  */
        
        const observer = new IntersectionObserver((entries) =>{
            entries.forEach((entry) =>{
        
                console.log(entry);

                if (entry.isIntersecting) {
                    entry.target.classList.add("shown");
                }
                
            });
        });
        
        const hiddenElements = document.querySelectorAll(".hidden");
        hiddenElements.forEach((el) => observer.observe(el));

    };
};

function checkZoom() {
    const zoomLevel = Math.round(window.devicePixelRatio * 100);

    if (zoomLevel >= 125) {
        document.getElementById('zoomOverlay').style.display = 'flex';
    } else {
        document.getElementById('zoomOverlay').style.display = 'none';
    }
}






