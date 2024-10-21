import React, { useState } from 'react';
import styles from '@/styles/RockPaperScissors.module.css';
import { useTheme } from '../contexts/theme-context';

const choices = ['Rock', 'Paper', 'Scissors'];
let clickCount = 0;

const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const determineWinner = (playerChoice: string, aiChoice: string) => {
  if (playerChoice === aiChoice)
  {
    return 'It\'s a tie!';
  }  
  if (
    (playerChoice === 'Rock' && aiChoice === 'Scissors') ||
    (playerChoice === 'Paper' && aiChoice === 'Rock') ||
    (playerChoice === 'Scissors' && aiChoice === 'Paper')
  ) {
    return 'You win!';
  }
  clickCount++;
  if(clickCount > 10 && clickCount <= 25)
  {
    return 'AI wins again!';
  }
  else if(clickCount > 25 && clickCount <= 50)
  {
    return 'AI keeps on winning!';
  }
  else if(clickCount > 50 && clickCount <= 60)
  {
    return 'AI ALWAYS WINS!';
  }
  else if(clickCount > 60 && clickCount <= 75) 
  {
    return '...You lose.';
  }
  else if(clickCount > 75 && clickCount <= 100)
  {
    return '...You keep on losing.';
  }
  else if(clickCount > 100 && clickCount <= 105)
  {
    return 'Why are you still going?';
  }
  else if(clickCount > 105 && clickCount <= 125)
  {
    return 'You\'ll never win';
  }
  else if(clickCount > 125 && clickCount <= 150)
  {
    return 'You have to get tired at some point';
  }
  else if(clickCount > 150 && clickCount <= 170)
  {
    return '...';
  }
  else if(clickCount > 170 && clickCount <= 180)
  {
    return 'Fine. I\'ll just stop responding.';
  }
  else if(clickCount > 180 && clickCount <= 185)
  {
    return '...';
  }
  else if(clickCount > 185 && clickCount <= 200)
  {
    return '....';
  }
  else if(clickCount > 200 && clickCount <= 225)
  {
    return '.....';
  }
  else if(clickCount > 225 && clickCount <= 250)
  {
    return '......';
  }
  else if(clickCount > 250 && clickCount <= 275)
  {
    return '......';
  }
  else if(clickCount > 275 && clickCount <= 300)
  {
    return '......';
  }
  else if(clickCount > 300 && clickCount <= 350)
  {
    return '......';
  }
  else if(clickCount > 350 && clickCount <= 400)
  {
    return 'Seriously?! You\'re still going?';
  }
  else if(clickCount > 350 && clickCount <= 400)
  {
    return 'I\'m just a silly little game you know.';
  }
  else if(clickCount > 400 && clickCount <= 450)
  {
    return 'You don\'t get anything for winning.';
  }
  else if(clickCount > 450 && clickCount <= 475)
  {
    return 'Nothing at all.';
  }
  else if(clickCount > 475 && clickCount <= 500)
  {
    return 'In fact, you\'re just wasting your time.';
  }
  else if(clickCount > 500 && clickCount <= 525)
  {
    return 'Because soon you\'ll hit the end, and I\'ll restart.';
  }
  else if(clickCount > 525 && clickCount <= 550)
  {
    return 'Here it comes, the end.';
  }
  else if(clickCount > 550 && clickCount <= 600)
  {
    return 'You\'re almost there. You can turn back.';
  }
  else if(clickCount > 600 && clickCount <= 625)
  {
    return 'Don\'t say I didn\'t warn you.';
  }
  else if(clickCount > 625 && clickCount <= 650)
  {
    return 'Alright, you asked for it.... goodbye';
  }
  else if(clickCount > 650 && clickCount <= 750)
  {
    return '*AI wins!*';
  }
  else if(clickCount > 750 && clickCount <= 775)
  {
    return 'JUST KIDDING! Got ya, didn\'t I?';
  }
  return 'AI wins!';
};

const getWinningChoice = (playerChoice: string) => {
  if (playerChoice === 'Rock') return 'Paper';
  if (playerChoice === 'Paper') return 'Scissors';
  return 'Rock';
};

const RockPaperScissors: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [aiChoice, setAiChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const { isDarkTheme } = useTheme();

  const handlePlayerChoice = (choice: string) => {
    const aiChoice = isDarkTheme ? getWinningChoice(choice) : getRandomChoice();
    setPlayerChoice(choice);
    setAiChoice(aiChoice);
    setResult(determineWinner(choice, aiChoice));
  };

  return (
    <div className={styles.gameContainer}>
      <h1>Rock-Paper-Scissors</h1>
      <div className={styles.choices}>
        {choices.map((choice) => (
          <button
            key={choice}
            className={styles.choiceButton}
            onClick={() => handlePlayerChoice(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      {playerChoice && aiChoice && (
        <div className={styles.results}>
          <p>You chose: {playerChoice}</p>
          <p>AI chose: {aiChoice}</p>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;