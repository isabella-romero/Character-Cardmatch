import './Card.css';

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    console.log("Card clicked:", card); // Log the clicked card
    if (!disabled && !flipped) { // Only allow clicking if not already flipped
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "inner flipped" : "inner"}> {/* Apply flipped class to inner div */}
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/Untitled design.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
