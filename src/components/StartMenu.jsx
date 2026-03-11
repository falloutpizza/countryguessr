//start menu
export default function StartMenu(started, setStarted) {
  return (
    <>
      <h1 className="start-text">countryguessr dot com</h1>
      <button
        className="button start-button"
        onClick={() => started.setStarted(true)}
      >
        start
      </button>
    </>
  );
}
