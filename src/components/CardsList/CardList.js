import Card from '../Card/Card';

function CardList({ renderedCards }) {
  return (
    <ul className='card-list'>
      {renderedCards ? renderedCards.map((flight) => (
        <Card key={flight.id} flight={flight} />
      )) : ''}
    </ul>
  );
}

export default CardList;
