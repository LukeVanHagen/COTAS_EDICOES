document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup-container");

    // Exibir pop-up com efeito
    setTimeout(() => {
        popup.classList.add("show");
    }, 200);

    // Eventos dos botões
    document.getElementById("cotas-ict").addEventListener("click", function () {
        window.open("./pages/cota-editor.html", "_blank");
    });

    document.getElementById("cotas-history").addEventListener("click", function () {
        window.open("./pages/cotas-history.html", "_blank");
    });


});
