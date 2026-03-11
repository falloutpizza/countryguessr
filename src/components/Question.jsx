export default function Question({ country, nextQuestion }) {
  return (
    <div className="row">
      <div className="count-image-container col">
        <img src={country.image} className="count-image" />
      </div>
      <div className="count-hints-container col">wsp</div>
    </div>
  );
}
