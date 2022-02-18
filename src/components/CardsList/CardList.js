import Card from '../Card/Card';

function CardList({ renderedCards }) {
  return (
    <ul className='card-list'>
      {renderedCards ? renderedCards.map((flight) => (
        <Card key={flight.id} flight={flight} />
      )) : ''}
      {/* <Card key={renderedCards[20].id} flight={renderedCards[20]} /> */}
    </ul>
  );
}

export default CardList;
