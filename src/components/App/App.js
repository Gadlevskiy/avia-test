import react from 'react';
import * as mainApi from '../../utils/MainApi';
import Main from '../Main/Main';

function App() {
  const [flightsInformation, setFlightsInformation] = react.useState({});
  const [fitDataOfFlights, setFitDataOfFlights] =react.useState({});


  react.useEffect(() => {
    setFlightsInformation(mainApi.serverResponse.result.flights);
    convertApiResponse();
  }, []);

  function convertApiResponse() {
    const response = mainApi.serverResponse.result.flights.map((item) => {
      const isTransferOnFirstFly = Boolean(item.flight.legs[0].segments.length === 2);
      const isTransferSecondFly = Boolean(item.flight.legs[1].segments.length === 2);
      return {
        flightId: item.flightToken,
        carrier: item.flight.carrier.caption,
        price: item.flight.price.total.amount,
        firstRun: isTransferOnFirstFly
          ? {
              transfer: true,
              departureAirport: item.flight.legs[0].segments[0].departureAirport.caption,
              departureAirportTag: item.flight.legs[0].segments[0].departureAirport.uid,
              departureCity: item.flight.legs[0].segments[0].departureCity ? `${item.flight.legs[0].segments[0].departureCity.caption}, ` : '',
              arrivalAirport: item.flight.legs[0].segments[1].arrivalAirport.caption,
              arrivalAirportTag: item.flight.legs[0].segments[1].arrivalAirport.uid,
              arrivalCity: item.flight.legs[0].segments[1].arrivalCity ? `${item.flight.legs[0].segments[1].arrivalCity.caption}, ` : '',
              departureDate: item.flight.legs[0].segments[0].departureDate,
              arrivalDate: item.flight.legs[0].segments[1].arrivalDate,
              travelDuration: item.flight.legs[0].duration,
              flightCarier: item.flight.legs[0].segments[0].airline.caption,
            }
          : {
              transfer: false,
              departureAirport: item.flight.legs[0].segments[0].departureAirport.caption,
              departureAirportTag: item.flight.legs[0].segments[0].departureAirport.uid,
              departureCity: item.flight.legs[0].segments[0].departureCity ? `${item.flight.legs[0].segments[0].departureCity.caption}, ` : '',
              arrivalAirport: item.flight.legs[0].segments[0].arrivalAirport.caption,
              arrivalAirportTag: item.flight.legs[0].segments[0].arrivalAirport.uid,
              arrivalCity: item.flight.legs[0].segments[0].arrivalCity ? `${item.flight.legs[0].segments[0].arrivalCity.caption}, ` : '',
              departureDate: item.flight.legs[0].segments[0].departureDate,
              arrivalDate: item.flight.legs[0].segments[0].arrivalDate,
              travelDuration: item.flight.legs[0].duration,
              flightCarier: item.flight.legs[0].segments[0].airline.caption,
            },
        secondRun: isTransferSecondFly
          ? {
              transfer: true,
              departureAirport: item.flight.legs[1].segments[0].departureAirport.caption,
              departureAirportTag: item.flight.legs[1].segments[0].departureAirport.uid,
              departureCity: item.flight.legs[1].segments[0].departureCity ? `${item.flight.legs[1].segments[0].departureCity.caption}, ` : '',
              arrivalAirport: item.flight.legs[1].segments[1].arrivalAirport.caption,
              arrivalAirportTag: item.flight.legs[1].segments[1].arrivalAirport.uid,
              arrivalCity: item.flight.legs[1].segments[1].arrivalCity ? `${item.flight.legs[1].segments[1].arrivalCity.caption}, ` : '',
              departureDate: item.flight.legs[1].segments[0].departureDate,
              arrivalDate: item.flight.legs[1].segments[1].arrivalDate,
              travelDuration: item.flight.legs[1].duration,
              flightCarier: item.flight.legs[1].segments[0].airline.caption,
            }
          : {
              transfer: false,
              departureAirport: item.flight.legs[1].segments[0].departureAirport.caption,
              departureAirportTag: item.flight.legs[1].segments[0].departureAirport.uid,
              departureCity: item.flight.legs[1].segments[0].departureCity ? `${item.flight.legs[1].segments[0].departureCity.caption}, ` : '',
              arrivalAirport: item.flight.legs[1].segments[0].arrivalAirport.caption,
              arrivalAirportTag: item.flight.legs[1].segments[0].arrivalAirport.uid,
              arrivalCity: item.flight.legs[1].segments[0].arrivalCity ? `${item.flight.legs[1].segments[0].arrivalCity.caption}, ` : '',
              departureDate: item.flight.legs[1].segments[0].departureDate,
              arrivalDate: item.flight.legs[1].segments[0].arrivalDate,
              travelDuration: item.flight.legs[1].duration,
              flightCarier: item.flight.legs[1].segments[0].airline.caption,
            },
      };
    });

    setFitDataOfFlights(response)
  }



  return (
    <div className='App'>
      <Main renderedCards={fitDataOfFlights} />
      <button onClick={console.log(fitDataOfFlights)}></button>
      <button onClick={console.log(flightsInformation)}></button>
    </div>
  );
}

export default App;
