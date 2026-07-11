/* ==================================================
   COUNTDOWN.JS - Configurado para 03/10/2026 11:00
================================================== */

// A data do evento: 3 de Outubro de 2026, às 11:00:00
// Nota: O mês no JavaScript começa em 0 (Janeiro = 0, Outubro = 9)
const dataCasamento = new Date(2026, 9, 3, 11, 0, 0);

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

function atualizarContador() {
    const agora = new Date();
    const diferenca = dataCasamento - agora;

    if (diferenca <= 0) {
        dias.textContent = "0";
        horas.textContent = "00";
        minutos.textContent = "00";
        segundos.textContent = "00";
        return;
    }

    const totalSegundos = Math.floor(diferenca / 1000);

    const d = Math.floor(totalSegundos / 86400);
    const h = Math.floor((totalSegundos % 86400) / 3600);
    const m = Math.floor((totalSegundos % 3600) / 60);
    const s = totalSegundos % 60;

    dias.textContent = d;
    horas.textContent = String(h).padStart(2, "0");
    minutos.textContent = String(m).padStart(2, "0");
    segundos.textContent = String(s).padStart(2, "0");
}

// Executa imediatamente e depois a cada segundo
atualizarContador();
setInterval(atualizarContador, 1000);