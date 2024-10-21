import React, { useState, useEffect } from 'react';
import styles from '@/styles/RockPaperScissors.module.css';
import { useTheme } from '../contexts/theme-context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { InsultResponse } from '@/types/insult-response';

const choices = ['Rock', 'Paper', 'Scissors'];
let clickCount = 0;
let aiInsult = false;

const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const userName = Cookies.get('ai-gen-name');

const determineWinner = (playerChoice: string, aiChoice: string) => {
  aiInsult = false;
  if (playerChoice === aiChoice)
  {
    return 'It\'s a tie!';
  }  
  if (
    (playerChoice === 'Rock' && aiChoice === 'Scissors') ||
    (playerChoice === 'Paper' && aiChoice === 'Rock') ||
    (playerChoice === 'Scissors' && aiChoice === 'Paper')
  ) {
    return 'You win!\nCongratulations!';
  }
  clickCount++;
  return Math.random() < 0.2 ? getAIMessage(clickCount) : "AI Wins!";
};

const getAIMessage = async (clickCount: number): Promise<string> => {
  const generateInsultResponse = await fetch('/api/generate-insult', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ clickCount: clickCount, userName: userName }),
  });

  aiInsult = true;
  const insultResponseJson: InsultResponse = await generateInsultResponse.json();
  return insultResponseJson.Insult;
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
  const [hasFormData, setHasFormData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const formData = Cookies.get('ai-gen-name');
    if (!formData) {
      router.replace('/404');
    } else {
      setHasFormData(true);
    }
  }, [router]);


  const handlePlayerChoice = async (choice: string) => {
    const aiChoice = isDarkTheme ? getWinningChoice(choice) : getRandomChoice();
    setPlayerChoice(choice);
    setAiChoice(aiChoice);
    const result = await determineWinner(choice, aiChoice);
    setResult(result);
  };

  if (!hasFormData) {
    return null;
  }

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
          {aiInsult && <h2 className={styles.results}>-GPT 4 Turbo</h2>}
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;