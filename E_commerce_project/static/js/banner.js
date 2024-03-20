document.addEventListener("DOMContentLoaded", function() {
    const bannerContainer = document.getElementById("banner-container");
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
    let slideId = 0;

    bannerContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - bannerContainer.offsetLeft;
        scrollLeft = bannerContainer.scrollLeft;
        bannerContainer.style.scrollBehavior = "auto";
    });

    bannerContainer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - bannerContainer.offsetLeft;
        const walk = (x - startX) * 2;
        bannerContainer.scrollLeft = scrollLeft - walk;

        const threshold = bannerContainer.offsetWidth / 2; 
        if (Math.abs(walk) > threshold) {
            slideId = walk < 0 ? 1 : 0; 
        } else {
            slideId = null; 
        }
    });

    bannerContainer.addEventListener("mouseup", () => {
        isDragging = false;
        bannerContainer.style.scrollBehavior = "smooth";

        if (slideId !== null) {
            bannerContainer.scrollLeft = slideId * bannerContainer.offsetWidth;
        }
    });

    bannerContainer.addEventListener("mouseleave", () => {
        isDragging = false;
        bannerContainer.style.scrollBehavior = "smooth"; 
    });
});
    