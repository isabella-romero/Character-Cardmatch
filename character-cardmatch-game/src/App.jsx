import { useEffect, useState } from 'react';
import Card from './components/Card.jsx';
import './App.css';
import './components/Card.css';

const cardImages = [
  { src: "/character-1.png", matched: false },
  { src: "/character-2.png", matched: false },
  { src: "/character-3.png", matched: false },
  { src: "/character-4.png", matched: false },
  { src: "/character-5.png", matched: false },
  { src: "/character-6.png", matched: false },
  { src: "/character-7.png", matched: false },
  { src: "/character-8.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));
    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card); // First card clicked
    } else {
      setChoiceTwo(card); // Second card clicked
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // If the cards match, update their matched status
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        // If the cards don't match, reset them after a delay
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Check if all cards are matched
  const allCardsMatched = cards.every((card) => card.matched);

  return (
    <div className="App">
      <h1>
        <span className="wave">C</span>
        <span className="wave">a</span>
        <span className="wave">r</span>
        <span className="wave">d</span>
        <span className="wave"> </span>
        <span className="wave">M</span>
        <span className="wave">a</span>
        <span className="wave">t</span>
        <span className="wave">c</span>
        <span className="wave">h</span>
        <span className="wave"> </span>
        <span className="wave">G</span>
        <span className="wave">a</span>
        <span className="wave">m</span>
        <span className="wave">e</span>
      </h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      {allCardsMatched && <h2>Amazing Job!</h2>} {/* Display message when all cards are matched */}
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
