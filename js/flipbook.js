/* =
   FLIPBOOK.JS
=*/

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

        mobileScrollSupport: false,

        useMouseEvents: true,

        swipeDistance: 100,

        showPageCorners: true,

        drawShadow: true,

        flippingTime: 1100,

        startPage: 0,

        autoSize: true

    });

    pageFlip.loadFromHTML(
        document.querySelectorAll("#livro .pagina")
    );

}


/* Quando carregar */

window.addEventListener("load", () => {

    iniciarLivro();

});


/* Responsividade */

window.addEventListener("resize", () => {

    clearTimeout(window.resizeTimer);

    window.resizeTimer = setTimeout(() => {

        iniciarLivro();

    }, 250);

});


/* Botão Abrir */

document.addEventListener("click", function (e) {

    if (e.target.id === "abrirLivro") {

        if (pageFlip) {

            pageFlip.flipNext();

        }

    }

});


/* Teclado */

document.addEventListener("keydown", function (e) {

    if (!pageFlip) return;

    switch (e.key) {

        case "ArrowRight":

            pageFlip.flipNext();

            break;

        case "ArrowLeft":

            pageFlip.flipPrev();

            break;

    }

});


/* Clique nas laterais */

document.addEventListener("click", function (e) {

    if (!pageFlip) return;

    const livro = document.getElementById("livro");

    const rect = livro.getBoundingClientRect();

    const x = e.clientX - rect.left;

    if (x < rect.width * 0.18) {

        pageFlip.flipPrev();

    }

    if (x > rect.width * 0.82) {

        pageFlip.flipNext();

    }

});


/* Eventos */

document.addEventListener("DOMContentLoaded", () => {

    if (!pageFlip) return;

});


/* Página mudou */

function paginaAtual() {

    if (!pageFlip) return 0;

    return pageFlip.getCurrentPageIndex();

}


/* Ir para página */

function irParaPagina(numero) {

    if (!pageFlip) return;

    pageFlip.flip(numero);

}


/* Próxima */

function proximaPagina() {

    if (!pageFlip) return;

    pageFlip.flipNext();

}


/* Anterior */

function paginaAnterior() {

    if (!pageFlip) return;

    pageFlip.flipPrev();

}