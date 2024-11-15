const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpSound = new Audio('../mario-jump-sound.mp3');
const deathSound = new Audio('../mario-death-sound.mp3');
const gameOver = document.querySelector('.game-over');
const jumpCountDisplay = document.getElementById('jump-count');  // Elemento que exibe o número de pulos
const highScoreDisplay = document.getElementById('high-score');  // Elemento que exibe a maior pontuação
let successfulJumps = 0; // Variável para armazenar os pulos bem-sucedidos
let marioHasJumped = false; // Variável para acompanhar se Mario já saltou
let marioPassedPipe = false; // Variável para acompanhar se Mario passou o cano
let pipePassed = false; // Nova variável para rastrear se o cano atual já passou
const backgroundMusic = new Audio('../background-music.mp3'); // Adiciona a música de fundo


// Carrega a maior pontuação da sessão atual do sessionStorage
let highScore = sessionStorage.getItem('highScore') || 0;
highScoreDisplay.textContent = highScore;

const startBackgroundMusic = () => {
  backgroundMusic.loop = true; // Define a música de fundo para repetir
  backgroundMusic.play(); // Toca a música de fundo
}

document.addEventListener('DOMContentLoaded', startBackgroundMusic);


const jump = () => {
  if (!marioHasJumped) { // Verifica se Mario não está no meio de um salto
    mario.classList.add('jump');
    jumpSound.play(); // Toca o som do pulo
    marioHasJumped = true; // Indica que Mario saltou

    setTimeout(() => {
      mario.classList.remove('jump');
      marioHasJumped = false; // Reseta após o salto
      if (marioPassedPipe) { // Verifica se Mario passou completamente pelo cano
        successfulJumps++;  // Incrementa a quantidade de pulos bem-sucedidos
        jumpCountDisplay.textContent = successfulJumps;  // Atualiza a exibição do número de pulos
        console.log('Pulo bem-sucedido! Total de pulos:', successfulJumps);
        marioPassedPipe = false; // Reseta a variável após contar o pulo
        pipePassed = false; // Reseta a variável para o próximo cano
      }
    }, 500); // Duração do salto
  }
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft; // Obtém a posição esquerda do cano
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // Obtém a posição inferior do Mario e remove 'px' para obter um valor numérico

  // Verificar se Mario colidiu com o cano
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = '../img/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    deathSound.play();
    gameOver.style.display = 'block';

    backgroundMusic.pause(); // Para a música de fundo
backgroundMusic.currentTime = 0; // Reseta a música de fundo


    // Atualiza a maior pontuação se a pontuação atual for maior
    if (successfulJumps > highScore) {
      highScore = successfulJumps;
      sessionStorage.setItem('highScore', highScore); // Armazena a maior pontuação no sessionStorage
      highScoreDisplay.textContent = highScore; // Atualiza a exibição da maior pontuação
    }

    clearInterval(loop);
  }

  // Verificar se Mario passou completamente pelo cano sem colidir
  if (pipePosition < 0 && marioHasJumped && !pipePassed) {
    marioPassedPipe = true; // Indica que Mario passou pelo cano
    pipePassed = true; // Indica que o cano atual foi contabilizado
  }
}, 10);

document.addEventListener('keydown', jump);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    this.location.reload();
  }
});
