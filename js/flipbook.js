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
        flippingTime: 1000,
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

/* Clique nas laterais (CORRIGIDO PARA IGNORAR O MANUAL) */
document.addEventListener("click", function (e) {
    if (!pageFlip) return;

    // SE O CLIQUE FOI NO MANUAL OU NO BALÃO, NÃO VIRA A PÁGINA!
    if (e.target.closest(".manual-item") || e.target.closest(".manual-popup")) {
        return;
    }

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

/* Lógica do Manual (CORRIGIDA E IMPEDINDO CONFLITOS NO TOQUE DO CELULAR) */
document.addEventListener("DOMContentLoaded", function() {
    const itens = document.querySelectorAll(".manual-item");

    function gerenciarPopup(e, elemento) {
        // Se clicou dentro do texto do próprio balão, ignora
        if (e.target.closest(".manual-popup")) return;

        e.preventDefault();
        e.stopPropagation(); // Impede o flipbook de receber o toque

        const jaAtivo = elemento.classList.contains("active");

        // Fecha todos os outros primeiro
        itens.forEach(outro => outro.classList.remove("active"));

        // Se não estava ativo, ativa agora
        if (!jaAtivo) {
            elemento.classList.add("active");
        }
    }

    itens.forEach(item => {
        // Dispara imediatamente no toque de celular
        item.addEventListener("touchstart", function(e) {
            gerenciarPopup(e, this);
        }, { passive: false });

        // Backup para clique de mouse
        item.addEventListener("click", function(e) {
            gerenciarPopup(e, this);
        });
    });

    // Fecha se tocar em qualquer outra parte vazia da tela
    const fecharTodos = function() {
        itens.forEach(item => item.classList.remove("active"));
    };

    document.addEventListener("click", fecharTodos);
    document.addEventListener("touchstart", fecharTodos);
});