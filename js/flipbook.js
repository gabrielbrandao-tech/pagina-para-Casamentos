let pageFlip;

/* Inicializa */
function iniciarLivro() {
    if (pageFlip) {
        pageFlip.destroy();
    }

    const livro = document.getElementById("livro");

    pageFlip = new St.PageFlip(livro, {
        width: 420,
        height: 700,
        minWidth: 280,
        maxWidth: 700,
        minHeight: 450,
        maxHeight: 900,
        size: "stretch",
        maxShadowOpacity: 0.45,
        showCover: true,
        
        // Mantemos ativado, mas aumentamos a sensibilidade abaixo
        mobileScrollSupport: true,
        useMouseEvents: true,

        // Aumentado para 60: exige que o dedo percorra mais distância 
        // antes de interpretar como virar página
        swipeDistance: 60, 

        showPageCorners: true,
        drawShadow: true,
        flippingTime: 900,
        startPage: 0,
        autoSize: true
    });

    pageFlip.loadFromHTML(
        document.querySelectorAll("#livro .pagina")
    );
}

/* Restante do teu código mantém-se igual... */
window.addEventListener("load", () => {
    iniciarLivro();
});

window.addEventListener("resize", () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        iniciarLivro();
    }, 250);
});

// ... (resto das tuas funções de eventos)