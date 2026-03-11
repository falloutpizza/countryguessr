export default function Question({ country, nextQuestion }) {
  return (
    <div className="row">
      <div className="count-image col">{country.name}</div>
      <div className="count-hints col">wsp</div>
    </div>
  );
}
