document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('root');
    
    // Estado do jogo
    let gameState = {
      started: false,
      usedLetters: [],
      remainingLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      timer: null,
      timeLeft: 300, // 5 minutos em segundos
      currentLetter: null
    };
  
    // Elementos da UI
    const container = document.createElement('div');
    container.className = 'container';
  
    const letterDisplay = document.createElement('div');
    letterDisplay.className = 'letter-display';
    letterDisplay.textContent = '?';
  
    const timerDisplay = document.createElement('div');
    timerDisplay.className = 'timer';
    timerDisplay.textContent = '05:00';
  
    const startButton = document.createElement('button');
    startButton.className = 'btn start-btn';
    startButton.textContent = 'Iniciar Jogo';
  
    const resetButton = document.createElement('button');
    resetButton.className = 'btn reset-btn';
    resetButton.textContent = 'Encerrar Jogo';
    resetButton.disabled = true;
  
    container.appendChild(letterDisplay);
    container.appendChild(timerDisplay);
    container.appendChild(startButton);
    container.appendChild(resetButton);
    app.appendChild(container);
  
    // Funções do jogo
    function getRandomLetter() {
      if (gameState.remainingLetters.length === 0) {
        return null; // Todas as letras foram usadas
      }
  
      const randomIndex = Math.floor(Math.random() * gameState.remainingLetters.length);
      const letter = gameState.remainingLetters[randomIndex];
      
      // Remove a letra do array de letras disponíveis
      gameState.remainingLetters.splice(randomIndex, 1);
      gameState.usedLetters.push(letter);
      
      return letter;
    }
  
    function updateTimerDisplay() {
      const minutes = Math.floor(gameState.timeLeft / 60);
      const seconds = gameState.timeLeft % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  
    function startTimer() {
      clearInterval(gameState.timer);
      gameState.timeLeft = 300;
      updateTimerDisplay();
      
      gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        updateTimerDisplay();
        
        if (gameState.timeLeft <= 0) {
          clearInterval(gameState.timer);
          startButton.disabled = false;
        }
      }, 1000);
    }
  
    function resetGame() {
      clearInterval(gameState.timer);
      gameState = {
        started: false,
        usedLetters: [],
        remainingLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        timer: null,
        timeLeft: 300,
        currentLetter: null
      };
      
      letterDisplay.textContent = '?';
      timerDisplay.textContent = '05:00';
      startButton.disabled = false;
      resetButton.disabled = true;
    }
  
    // Event listeners
    startButton.addEventListener('click', () => {
      gameState.started = true;
      gameState.currentLetter = getRandomLetter();
      
      if (gameState.currentLetter) {
        letterDisplay.textContent = gameState.currentLetter;
        startTimer();
        startButton.disabled = true;
        resetButton.disabled = false;
      } else {
        letterDisplay.textContent = 'Todas as letras foram usadas!';
      }
    });
  
    resetButton.addEventListener('click', resetGame);
  });