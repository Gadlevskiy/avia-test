import Card from '../Card/Card';

function CardList({ renderedCards }) {
  return (
    <ul className='card-list'>
      {renderedCards.map((flight) => (
        <Card key={flight.flightToken} flight={flight} />
      ))}
    </ul>
  );
}

export default CardList;
