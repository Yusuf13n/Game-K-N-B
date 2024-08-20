const buttons = document.querySelectorAll('button');
        const resultDiv = document.getElementById('result');
        const scoreSpan = document.getElementById('score');
        const computerScoreSpan = document.getElementById('computerScore');
        const restartButton = document.getElementById('restart');
        const audioWin = new Audio('sound/Voicy_SUIIIII SOUND EFFECT.mp3'); 
        const audioLose = new Audio('sound/motivatsiiu-nado-podniat.mp3'); 
        const audioDraw = new Audio('sound/vova_adidas_vy_ne_gotovy_vse-mob4ik.com.mp3'); 

        
        let playerScore = 0;
        let computerScore = 0;
        let roundCount = 0;

        function getComputerChoice() {
            const knb = ['Камень', 'Ножницы', 'Бумага'];
            const randomIndex = Math.floor(Math.random() * knb.length);

            return knb[randomIndex];
        }

        function playRound(player, computerChoice) {
          if (player === computerChoice) {
            return 'Ничья';
          } else if (
            (player === 'Камень' && computerChoice === 'Ножницы') ||
            (player === 'Бумага' && computerChoice === 'Камень') ||
            (player === 'Ножницы' && computerChoice === 'Бумага')
          ) {
            playerScore++;
            return 'Вы выиграли';
          } else {
            computerScore++;
            return 'Вы проиграли';
          }
        }

        function outputResult(player, computerChoice, result) {
          resultDiv.innerHTML = `Вы выбрали: ${player}<br/> Компьютер выбрал: ${computerChoice}<br/> Результат: ${result}`;
          scoreSpan.textContent = playerScore;
          computerScoreSpan.textContent = computerScore;

          if (result === 'Вы выиграли') {
            audioWin.play();
          } else if (result === 'Вы проиграли') {
            audioLose.play();
          }

          roundCount++;
          if (playerScore >= 5 || computerScore >= 5) {
            endGame();
          }else if(result === 'Ничья') {
            audioDraw.play();
          }
        }

        function endGame() {
          buttons.forEach(button => {
            button.disabled = true;
          });
          resultDiv.innerHTML = `Игра окончена! <br/>`;

          if (playerScore > computerScore) {
            resultDiv.innerHTML += `Вы победили!`;
          } else if (playerScore < computerScore) {
            resultDiv.innerHTML += `Компьютер победил!`;
          } else {
            resultDiv.innerHTML += `Ничья!`;
          }
          restartButton.disabled = false;
        }

        function resetGame() {
          playerScore = 0;
          computerScore = 0;
          roundCount = 0;
          scoreSpan.textContent = playerScore;
          computerScoreSpan.textContent = computerScore;
          resultDiv.innerHTML = '';
          buttons.forEach(button => {
            button.disabled = false;
          });
          restartButton.disabled = true;
        }

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const player = button.id;
                const computerChoice = getComputerChoice();
                const result = playRound(player, computerChoice);
                outputResult(player, computerChoice, result);
            });
        });

        restartButton.addEventListener('click', resetGame);