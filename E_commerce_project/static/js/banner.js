document.addEventListener("DOMContentLoaded", function() {
    const bannerContainer = document.getElementById("banner-container");
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;
    let slideId = 0;

    function startDrag(e) {
        isDragging = true;
        if (e.type === "mousedown" || e.type === "touchstart") {
            startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
            startX -= bannerContainer.offsetLeft;
        }
        scrollLeft = bannerContainer.scrollLeft;
        bannerContainer.style.scrollBehavior = "auto";
    }

    function moveDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        let x;
        if (e.type === "mousemove" || e.type === "touchmove") {
            x = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
            x -= bannerContainer.offsetLeft;
        }
        const walk = (x - startX) * 2;
        bannerContainer.scrollLeft = scrollLeft - walk;

        const threshold = bannerContainer.offsetWidth / 2;
        if (Math.abs(walk) > threshold) {
            slideId = walk < 0 ? 1 : 0;
        } else {
            slideId = null;
        }
    }

    function endDrag(e) {
        isDragging = false;
        bannerContainer.style.scrollBehavior = "smooth";

        if (slideId !== null) {
            bannerContainer.scrollLeft = slideId * bannerContainer.offsetWidth;
        }
    }

    bannerContainer.addEventListener("mousedown", startDrag);
    bannerContainer.addEventListener("mousemove", moveDrag);
    bannerContainer.addEventListener("mouseup", endDrag);
    bannerContainer.addEventListener("mouseleave", endDrag);

    bannerContainer.addEventListener("touchstart", startDrag);
    bannerContainer.addEventListener("touchmove", moveDrag);
    bannerContainer.addEventListener("touchend", endDrag);
    bannerContainer.addEventListener("touchcancel", endDrag);
});
