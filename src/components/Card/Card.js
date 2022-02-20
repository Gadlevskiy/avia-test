function Card({ flight }) {

  function convertIsoDate(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + ' ч ' + minutes + ' мин';
  }

  function getTimeFromDate(date) {
    const newDate = new Date(date);
    return newDate.getHours()+':'+newDate.getMinutes()
  }

  function getMonthFromDate(date) {
    const newDate = new Date(date);
    const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    return newDate.getDate()+' '+(months[newDate.getMonth()]).toLocaleLowerCase()+'. '+(days[newDate.getDay()]).toLocaleLowerCase()
  }

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
            <span className='card_path-info-teg'>({flight.firstRun.departureAirportTag})</span> &rarr;{' '}
            {flight.firstRun.arrivalCity}
            {flight.firstRun.arrivalAirport}{' '}
            <span className='card_path-info-teg'>({flight.firstRun.arrivalAirportTag})</span>
          </div>
          <div className='card_time-info'>
            <div className='card_time-block'>
              <p className='card_time'>{getTimeFromDate(flight.firstRun.departureDate)}</p>
              <p className='card_date'>{getMonthFromDate(flight.firstRun.departureDate)}</p>
            </div>
            <p className='card_duration'>{convertIsoDate(flight.firstRun.travelDuration)}</p>
            <div className='card_time-block'>
              <p className='card_date'>{getMonthFromDate(flight.firstRun.arrivalDate)}</p>
              <p className='card_time'>{getTimeFromDate(flight.firstRun.arrivalDate)}</p>
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
            <span className='card_path-info-teg'>({flight.secondRun.departureAirportTag})</span> &rarr;{' '}
            {flight.secondRun.arrivalCity}
            {flight.secondRun.arrivalAirport}{' '}
            <span className='card_path-info-teg'>({flight.secondRun.arrivalAirportTag})</span>
          </div>
          <div className='card_time-info'>
            <div className='card_time-block'>
              <p className='card_time'>{getTimeFromDate(flight.secondRun.departureDate)}</p>
              <p className='card_date'>{getMonthFromDate(flight.secondRun.departureDate)}</p>
            </div>
            <p className='card_duration'>{convertIsoDate(flight.secondRun.travelDuration)}</p>
            <div className='card_time-block'>
              <p className='card_date'>{getMonthFromDate(flight.secondRun.arrivalDate)}</p>
              <p className='card_time'>{getTimeFromDate(flight.secondRun.arrivalDate)}</p>
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
