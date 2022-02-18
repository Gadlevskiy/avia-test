function Card({ flight }) {
  return (
    <li className='card'>
      <div className='card_header'>
        <img alt='логотип' className='card_logo' />
        <div className='card_preview'>
          <div className='card_price'>{flight.price} &#8381;</div>
          <div className='card_header-text'>Стоимость для одного взрослого пассажира</div>
        </div>
      </div>
      <div className='card_body'>
        <div className='card_flight-info'>
          <div className='card_path-info'>
            {flight.firstRun.departureCity}
            {flight.firstRun.departureAirport}{' '}
            <span className='card_path-info-teg'>{flight.firstRun.departureAirportTag}</span> &rarr;{' '}
            {flight.firstRun.arrivalCity}
            {flight.firstRun.arrivalAirport}{' '}
            <span className='card_path-info-teg'>{flight.firstRun.arrivalAirportTag}</span>
          </div>
          <div className='card_time-info'>
            <div className='card_time-block'>
              <p className='card_time'>20:40</p>
              <p className='card_date'>18авг</p>
            </div>
            <p className='card_duration'>14:45</p>
            <div className='card_time-block'>
              <p className='card_date'>19авг</p>
              <p className='card_time'>09:25</p>
            </div>
          </div>
          <div className='card_transfer-info'>
            <hr className='card_split-line' />
            {flight.firstRun.transfer ? <div className='card_transfer-status'>1 пересадка</div> : ''}
          </div>
          <div className='card_airline-info'>Рейс выполняет: {flight.firstRun.flightCarier}</div>
        </div>
        <div className='card_flight-info'>
          <div className='card_path-info'>
            {flight.secondRun.departureCity}
            {flight.secondRun.departureAirport}{' '}
            <span className='card_path-info-teg'>{flight.secondRun.departureAirportTag}</span> &rarr;{' '}
            {flight.secondRun.arrivalCity}
            {flight.secondRun.arrivalAirport}{' '}
            <span className='card_path-info-teg'>{flight.secondRun.arrivalAirportTag}</span>
          </div>
          <div className='card_time-info'>
            <div className='card_time-block'>
              <p className='card_time'>20:40</p>
              <p className='card_date'>18авг</p>
            </div>
            <p className='card_duration'>14:45</p>
            <div className='card_time-block'>
              <p className='card_date'>19авг</p>
              <p className='card_time'>09:25</p>
            </div>
          </div>
          <div className='card_transfer-info'>
            <hr className='card_split-line' />
            {flight.secondRun.transfer ? <div className='card_transfer-status'>1 пересадка</div> : ''}
          </div>
          <div className='card_airline-info'>Рейс выполняет: {flight.secondRun.flightCarier}</div>
        </div>
      </div>
      <button className='card_select-btn'>ВЫБРАТЬ</button>
    </li>
  );
}

export default Card;
