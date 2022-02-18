import react from 'react';
import * as mainApi from '../../utils/MainApi';
import Main from '../Main/Main';

function App() {
  const [fitDataOfFlights, setFitDataOfFlights] = react.useState([]);
  const [filteredData, setFilteredData] = react.useState([]);
  const [shownFilteredData, setShownFilteredData] = react.useState([]);

  react.useEffect(() => {
    convertApiResponse();
  }, []);

  // react.useEffect(()=>{
  //   setShownFilteredData(filteredData);
  // }, [filteredData])

  react.useEffect(() => {
    setShownFilteredData(fitDataOfFlights);
  }, [fitDataOfFlights]);

  function convertApiResponse() {
    const response = mainApi.serverResponse.result.flights.map((item, id) => {
      const isTransferOnFirstFly = Boolean(item.flight.legs[0].segments.length === 2);
      const isTransferSecondFly = Boolean(item.flight.legs[1].segments.length === 2);
      return {
        id: id,
        carrier: item.flight.carrier.caption,
        price: item.flight.price.total.amount,
        firstRun: isTransferOnFirstFly
          ? {
              transfer: true,
              departureAirport: item.flight.legs[0].segments[0].departureAirport.caption,
              departureAirportTag: item.flight.legs[0].segments[0].departureAirport.uid,
              departureCity: item.flight.legs[0].segments[0].departureCity
                ? `${item.flight.legs[0].segments[0].departureCity.caption}, `
                : '',
              arrivalAirport: item.flight.legs[0].segments[1].arrivalAirport.caption,
              arrivalAirportTag: item.flight.legs[0].segments[1].arrivalAirport.uid,
              arrivalCity: item.flight.legs[0].segments[1].arrivalCity
                ? `${item.flight.legs[0].segments[1].arrivalCity.caption}, `
                : '',
              departureDate: item.flight.legs[0].segments[0].departureDate,
              arrivalDate: item.flight.legs[0].segments[1].arrivalDate,
              travelDuration: item.flight.legs[0].duration,
              flightCarier: item.flight.legs[0].segments[0].airline.caption,
            }
          : {
              transfer: false,
              departureAirport: item.flight.legs[0].segments[0].departureAirport.caption,
              departureAirportTag: item.flight.legs[0].segments[0].departureAirport.uid,
              departureCity: item.flight.legs[0].segments[0].departureCity
                ? `${item.flight.legs[0].segments[0].departureCity.caption}, `
                : '',
              arrivalAirport: item.flight.legs[0].segments[0].arrivalAirport.caption,
              arrivalAirportTag: item.flight.legs[0].segments[0].arrivalAirport.uid,
              arrivalCity: item.flight.legs[0].segments[0].arrivalCity
                ? `${item.flight.legs[0].segments[0].arrivalCity.caption}, `
                : '',
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
              departureCity: item.flight.legs[1].segments[0].departureCity
                ? `${item.flight.legs[1].segments[0].departureCity.caption}, `
                : '',
              arrivalAirport: item.flight.legs[1].segments[1].arrivalAirport.caption,
              arrivalAirportTag: item.flight.legs[1].segments[1].arrivalAirport.uid,
              arrivalCity: item.flight.legs[1].segments[1].arrivalCity
                ? `${item.flight.legs[1].segments[1].arrivalCity.caption}, `
                : '',
              departureDate: item.flight.legs[1].segments[0].departureDate,
              arrivalDate: item.flight.legs[1].segments[1].arrivalDate,
              travelDuration: item.flight.legs[1].duration,
              flightCarier: item.flight.legs[1].segments[0].airline.caption,
            }
          : {
              transfer: false,
              departureAirport: item.flight.legs[1].segments[0].departureAirport.caption,
              departureAirportTag: item.flight.legs[1].segments[0].departureAirport.uid,
              departureCity: item.flight.legs[1].segments[0].departureCity
                ? `${item.flight.legs[1].segments[0].departureCity.caption}, `
                : '',
              arrivalAirport: item.flight.legs[1].segments[0].arrivalAirport.caption,
              arrivalAirportTag: item.flight.legs[1].segments[0].arrivalAirport.uid,
              arrivalCity: item.flight.legs[1].segments[0].arrivalCity
                ? `${item.flight.legs[1].segments[0].arrivalCity.caption}, `
                : '',
              departureDate: item.flight.legs[1].segments[0].departureDate,
              arrivalDate: item.flight.legs[1].segments[0].arrivalDate,
              travelDuration: item.flight.legs[1].duration,
              flightCarier: item.flight.legs[1].segments[0].airline.caption,
            },
      };
    });

    setFitDataOfFlights(response);
    setFilteredData(response);
  }

  function filterFromHightToLow(data) {
    return data.sort((a, b) => {
      return a.price - b.price;
    });
  }

  function filterFromLowToHight(data) {
    return data.sort((a, b) => {
      return b.price - a.price;
    });
  }

  function filterByOneTransfer(data) {
    return data.filter((flight) => {
      if (flight.firstRun.transfer && flight.secondRun.transfer) {
        return false;
      } else if (!flight.firstRun.transfer && !flight.secondRun.transfer) {
        return false;
      } else {
        return true;
      }
    });
  }

  function filterByNoTransfer(data) {
    return data.filter((flight) => {
      if (!flight.firstRun.transfer && !flight.secondRun.transfer) {
        return true;
      } else {
        return false;
      }
    })
  }

  function filterByTransfer(isTransferChecked, isNoTransferChecked) {
    if (isTransferChecked) {
      if (isNoTransferChecked) {
        setShownFilteredData([...filterByOneTransfer(filteredData)], filterByNoTransfer(filteredData))
      } else {
        setShownFilteredData(filterByOneTransfer(filteredData))
      }
    } else {
      if (isNoTransferChecked) {
        setShownFilteredData(filterByNoTransfer(filteredData))
      } else{
        setShownFilteredData(filteredData)
      }
    }
  }

  function SortFlights(
    isOrderChecked
    // isTransferChecked,
    // isNoTransferChecked,
    // minFilterValue,
    // maxFilterValue
  ) {
    console.log(isOrderChecked);
    const NotSortData = filteredData;
    switch (isOrderChecked) {
      case '1':
        setShownFilteredData(filterFromHightToLow(NotSortData));
        break;
      case '2':
        setShownFilteredData(filterFromLowToHight(NotSortData));
        break;
      case '3':
        const buffer2 = NotSortData.sort((a, b) => {
          return a.firstRun.travelDuration - b.firstRun.travelDuration;
        });
        console.log(buffer2);
        setShownFilteredData(buffer2);
        break;
      default:
        return;
    }
  }

  return (
    <div className='App'>
      <Main renderedCards={shownFilteredData} onFilter={filterByTransfer} onSort={SortFlights} />
      {/* <button onClick={console.log(fitDataOfFlights)}></button> */}
    </div>
  );
}

export default App;
