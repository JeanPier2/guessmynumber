import { useState, useRef } from 'react';

let secretNumber = Math.trunc(Math.random() * 20) + 1;

function App() {
  console.log('Secret Number', secretNumber);
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);

  const guessTag = useRef(null);
  const messageTag = useRef(null);
  const scoreTag = useRef(null);
  const numberTag = useRef(null);
  const highScoreTag = useRef(null);
  const displayMessage = (text) => {
    messageTag.current.textContent = text;
  };

  const check = () => {
    console.log('Secret Score', score);

    const guess = Number(guessTag.current.value);

    if (guess === secretNumber) {
      displayMessage('Correct Number!! 🎉🎉');
      document.body.style.backgroundColor = '#60b347';
      numberTag.current.style.width = '30rem';
      numberTag.current.textContent = secretNumber;
      if (score > highScore) {
        setHighScore(score);
        highScoreTag.current.textContent = highScore;
      }
    } else {
      if (score > 1) {
        displayMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
        setScore(score - 1);
        scoreTag.current.textContent = score;
      } else {
        displayMessage('💥 You lost the game');
        scoreTag.current.textContent = '0';
        document.body.style.backgroundColor = '#e74c3c';
      }
    }
  };

  const again = () => {
    guessTag.current.value = '';
    displayMessage('Start guessing...');
    setScore(20);
    scoreTag.current.textContent = score;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.body.style.backgroundColor = '#222';
    numberTag.current.style.width = '15rem';
    numberTag.current.textContent = '?';
  };

  return (
    <div>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button onClick={again} className="btn again">
          Again!
        </button>
        <div ref={numberTag} className="number">
          ?
        </div>
      </header>
      <main>
        <section className="left">
          <input type="number" className="guess" ref={guessTag} />
          <button onClick={check} className="btn check">
            Check!
          </button>
        </section>
        <section className="right">
          <p ref={messageTag} className="message">
            Start guessing...
          </p>
          <p className="label-score">
            💯 Score:{' '}
            <span ref={scoreTag} className="score">
              {score}
            </span>
          </p>
          <p className="label-highscore">
            🥇 Highscore:{' '}
            <span ref={highScoreTag} className="highscore">
              {highScore}
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
