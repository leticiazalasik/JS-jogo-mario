const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpSound = new Audio('../mario-jump-sound.mp3');
const deathSound = new Audio('../mario-death-sound.mp3');
const gameOver = document.querySelector('.game-over');

const jump = () => {
  mario.classList.add('jump');
  jumpSound.play();

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);

};

const loop = setInterval(() => {

  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = '../img/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    deathSound.play();
    gameOver.style.display = 'block';

    clearInterval(loop);
  }
}, 10);

document.addEventListener('keydown', jump);

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      this.location.reload();
    }
  });