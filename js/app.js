document.addEventListener("DOMContentLoaded", () => {

    criarPetalas();

    revelarConteudo();

});


/* =
   Revelar elementos
= */

function revelarConteudo() {

    const elementos = document.querySelectorAll("section");

    elementos.forEach((elemento, index) => {

        elemento.style.opacity = "0";

        setTimeout(() => {

            elemento.style.transition = "opacity .8s ease, transform .8s ease";

            elemento.style.opacity = "1";

            elemento.style.transform = "translateY(0)";

        }, 150 * index);

    });

}


/* =
   Pétalas
= */

function criarPetalas() {

    const imagens = [

        "img/petalas/petala1.png",
        "img/petalas/petala2.png",
        "img/petalas/petala3.png"

    ];

    setInterval(() => {

        const petala = document.createElement("div");

        petala.className = "petal";

        petala.style.left = Math.random() * window.innerWidth + "px";

        petala.style.width = (18 + Math.random() * 18) + "px";

        petala.style.height = petala.style.width;

        petala.style.animationDuration = (8 + Math.random() * 6) + "s";

        petala.style.animationDelay = "0s";

        petala.style.backgroundImage =
            `url(${imagens[Math.floor(Math.random()*imagens.length)]})`;

        petala.style.transform =
            `rotate(${Math.random()*360}deg)`;

        document.body.appendChild(petala);

        setTimeout(() => {

            petala.remove();

        },15000);

    },500);

}


/* =
   Zoom da galeria
= */

document.addEventListener("click",function(e){

    if(!e.target.closest(".galeria img")) return;

    const overlay=document.createElement("div");

    overlay.className="lightbox";

    overlay.innerHTML=`

        <img src="${e.target.src}">

    `;

    document.body.appendChild(overlay);

    overlay.addEventListener("click",()=>{

        overlay.remove();

    });

});


/* =
   Botão voltar ao topo
= */

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        document.body.classList.add("scrolled");

    }else{

        document.body.classList.remove("scrolled");

    }

});


/* =
   Smooth Scroll
= */

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const alvo=document.querySelector(this.getAttribute("href"));

        if(alvo){

            alvo.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/* =
   Redimensionamento
=*/

window.addEventListener("resize",()=>{

    document.documentElement.style.setProperty(

        "--vh",

        `${window.innerHeight*0.01}px`

    );

});


window.dispatchEvent(new Event("resize"));