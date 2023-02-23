// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;

let tiempoRestanteId = null;


// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById(`t-restante`);

//Audios
let winAudio = new Audio('./sounds/win.mp3');
let loseAudio = new Audio('./sounds/lose.mp3');
let clickAudio = new Audio('./sounds/click.mp3');
let rightAudio = new Audio('./sounds/right.mp3');
let wrongAudio = new Audio('./sounds/wrong.mp3');

// Generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

// let timer = 60;
// let timerInicial = 60;
// function contarTiempo() {
//     tiempoRestanteId = setInterval(() => {
//         timer--;
//         mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
//         if (timer == 0) {
//             clearInterval(tiempoRestanteId);
//             bloquearTarjetas(numeros);
//             loseAudio.play();
//         }
//     }, 1000);
// }

let timer = 45;
let timerInicial = 45;
let tiemposPorNivel = [60, 45, 30, 15];
let nivelActual = 0;

function contarTiempo() {
    timer
    timerInicial
    // timer = tiemposPorNivel[nivelActual];
    // timerInicial = tiemposPorNivel[nivelActual];

    tiempoRestanteId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer <= 0) {
            clearInterval(tiempoRestanteId);
            bloquearTarjetas(numeros);
            loseAudio.play();
        }
    }, 1000);
}

// function siguienteNivel() {
//     clearInterval(tiempoRestanteId);
//     nivelActual++;
//     contarTiempo();
// }

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png">`;
        tarjetaBloqueada.disabled = true;
    }
}
let volumeControl = document.getElementById("volume");

volumeControl.addEventListener("input", function () {
    winAudio.volume = this.value;
    loseAudio.volume = this.value;
    clickAudio.volume = this.value;
    rightAudio.volume = this.value;
    wrongAudio.volume = this.value;
});

let volumeLink = document.getElementById("volume-link");
let volumeControl1 = document.getElementById("volume-control");

volumeLink.addEventListener("click", function () {
    if (volumeControl1.style.display === "none") {
        volumeControl1.style.display = "flex";
    } else {
        volumeControl1.style.display = "none";
    }
});



const volumeSlider = document.querySelector('input[type="range"]');
volumeSlider.addEventListener('input', function () {
    const percentage = (100 * this.value).toFixed(0);
    this.style.background = `linear-gradient(to right, rgb(26, 188, 156)  ${percentage}%, gray ${percentage}%)`;
});

// Funcion principal
function destapar(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }


    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        // Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png">`;
        clickAudio.play();

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png">`;

        // Desabilitar segundo boton
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            // Encerar Contador tarjetas destapadas
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if (aciertos == 8) {
                winAudio.play();
                clearInterval(tiempoRestanteId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱 `
                mostrarTiempo.innerHTML = `¡GENIAL! 🎉 Sólo tardaste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤩`




            }

        } else {
            wrongAudio.play();
            // Mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}
