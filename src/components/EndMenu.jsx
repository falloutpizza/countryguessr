export default function EndMenu({
  score,
  setStarted,
  setEnded,
  setTotalScore,
}) {
  return (
    <div>
      <h2 className="end-text">your final score was: {score}</h2>
      <h3>i hope you had fun playing!!</h3>
      <button
        className="control-btn"
        onClick={() => {
          setStarted(true);
          setEnded(false);
          setTotalScore(0);
        }}
      >
        play again?
      </button>
    </div>
  );
}
