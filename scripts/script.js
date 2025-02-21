document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup-container");

    // Exibir pop-up com efeito
    setTimeout(() => {
        popup.classList.add("show");
    }, 200);

    // Eventos dos botões
    document.getElementById("cota-ict").addEventListener("click", function () {
        window.open("./pages/cota-editor.html", "_blank");
    });

    document.getElementById("delete-pn").addEventListener("click", function () {
        window.open("./pages/delete-pn.html", "_blank");
    });

    document.getElementById("edit-pn").addEventListener("click", function () {
        window.open("./pages/edit-pn.html", "_blank");
    });
});
