document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup-container");

   
    setTimeout(() => {
        popup.classList.add("show");
    }, 200);

    
    document.getElementById("cotas-ict").addEventListener("click", function () {
        window.location.href = "./pages/cota-editor.html"; // Abre na mesma guia
    });

    document.getElementById("cotas-history").addEventListener("click", function () {
        window.location.href = "./pages/cotas-history.html"; // Abre na mesma guia
    });

    document.getElementById("cotas-help").addEventListener("click", function () {
        window.location.href = "./pages/cotas-help.html"; // Abre na mesma guia
    });


});

