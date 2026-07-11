/* ==================================================
   MUSIC.JS
   Controle da música de fundo
================================================== */

const musica = document.getElementById("musica");
const botaoMusica = document.getElementById("musicButton");
const botaoAbrir = document.getElementById("abrirLivro");

let musicaIniciada = false;

/* Volume inicial */

musica.volume = 0.4;

/* ==========================================
   Inicia a música ao abrir o convite
========================================== */

function iniciarMusica() {

    if (musicaIniciada) return;

    musica.play()
        .then(() => {

            musicaIniciada = true;

            botaoMusica.textContent = "🔊";

        })
        .catch(() => {

            console.log("O navegador bloqueou a reprodução automática.");

        });

}

/* Clique no botão Abrir Convite */

if (botaoAbrir) {

    botaoAbrir.addEventListener("click", () => {

        iniciarMusica();

    });

}

/* ==========================================
   Liga / Desliga
========================================== */

botaoMusica.addEventListener("click", () => {

    if (musica.paused) {

        musica.play();

        botaoMusica.textContent = "🔊";

        musicaIniciada = true;

    } else {

        musica.pause();

        botaoMusica.textContent = "🔇";

    }

});

/* ==========================================
   Atualiza ícone
========================================== */

musica.addEventListener("play", () => {

    botaoMusica.textContent = "🔊";

});

musica.addEventListener("pause", () => {

    botaoMusica.textContent = "🔇";

});

/* ==========================================
   Caso o navegador interrompa a música
========================================== */

document.addEventListener("visibilitychange", () => {

    if (!document.hidden && musicaIniciada && musica.paused) {

        musica.play().catch(() => {});

    }

});