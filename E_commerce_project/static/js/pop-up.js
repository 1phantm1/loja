let popUp = document.querySelector("#pop-up");
let why = document.querySelector("#why_create");
let close = document.querySelector("#close-icon");
let overlay = document.querySelector("div#overlay")
why.addEventListener("click", () => {
    popUp.style.display = "block";
    overlay.classList.add("active_over");
    void popUp.offsetWidth; // Forçar o reflow do DOM
    popUp.classList.add("show");
});

close.addEventListener("click", () => {
    popUp.classList.remove("show");
    overlay.classList.remove("active_over")
    setTimeout(() => {
        popUp.style.display = "none"; // Ocultar o pop-up após a animação terminar
    }, 300); // Tempo de espera igual ao tempo da animação (0.3s no caso)
});
