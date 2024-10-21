import React, { useState } from 'react';
import styles from '@/styles/RockPaperScissors.module.css';
import { useTheme } from '../contexts/theme-context';

const choices = ['Rock', 'Paper', 'Scissors'];

const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const determineWinner = (playerChoice: string, aiChoice: string) => {
  if (playerChoice === aiChoice) return 'It\'s a tie!';
  if (
    (playerChoice === 'Rock' && aiChoice === 'Scissors') ||
    (playerChoice === 'Paper' && aiChoice === 'Rock') ||
    (playerChoice === 'Scissors' && aiChoice === 'Paper')
  ) {
    return 'You win!';
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