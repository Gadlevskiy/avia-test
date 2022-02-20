import react from 'react';
import * as mainApi from '../../utils/MainApi';
import Main from '../Main/Main';

function App() {
  const [fitDataOfFlights, setFitDataOfFlights] = react.useState([]);
  const [fitDataOfBestPrices, setFitDataOfBestPrices] = react.useState([]);
  const [filteredData, setFilteredData] = react.useState([]);
  const [shownFilteredData, setShownFilteredData] = react.useState([]);

  react.useEffect(() => {
    convertApiResponse();
  }, []);

  react.useEffect(() => {
    globalFilter('1', false, false, '0', '100000');
  }, [filteredData]);

  react.useEffect(() => {
    setShownFilteredData(fitDataOfFlights);
    createListOfBestPrices(fitDataOfFlights)
  }, [fitDataOfFlights]);


  function convertApiResponse() {
    const listOfFlights = mainApi.serverResponse.result.flights.map((item, id) => {
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

    setFitDataOfFlights(listOfFlights);
    setFilteredData(listOfFlights);
  }

  function filterFromHightToLow(data) {
    return data.sort((a, b) => {
      return b.price - a.price;
    });
  }

  function filterFromLowToHight(data) {
    return data.sort((a, b) => {
      return a.price - b.price;
    });
  }

  function filterByDuration(data) {
    return data.sort((a, b) => {
      return a.firstRun.travelDuration - b.firstRun.travelDuration;
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
    });
  }

  function filterByCocatTransfer(data) {
    return data.filter((flight) => {
      if (flight.firstRun.transfer && flight.secondRun.transfer) {
        return false;
      } else {
        return true;
      }
    });
  }

  function filterByPrice(min, max, data) {
    return data.filter((flight) => {
      return Number(min) <= flight.price && flight.price <= Number(max);
    });
  }

  function filterByTransfer(isTransferChecked, isNoTransferChecked, data) {
    if (isTransferChecked) {
      if (isNoTransferChecked) {
        return filterByCocatTransfer(data);
      } else {
        return filterByOneTransfer(data);
      }
    } else {
      if (isNoTransferChecked) {
        return filterByNoTransfer(data);
      } else {
        return data;
      }
    }
  }

  function globalFilter(
    isOrderChecked,
    isTransferChecked,
    isNoTransferChecked,
    minFilterValue,
    maxFilterValue
  ) {
    if (isOrderChecked === '1') {
      const firstLeveData = filterFromLowToHight(filteredData);
      const secondLevelData = filterByTransfer(
        isTransferChecked,
        isNoTransferChecked,
        firstLeveData
      );
      const thirdLevelData = filterByPrice(minFilterValue, maxFilterValue, secondLevelData);
      setShownFilteredData(thirdLevelData);
    } else if (isOrderChecked === '2') {
      const firstLeveData = filterFromHightToLow(filteredData);
      const secondLevelData = filterByTransfer(
        isTransferChecked,
        isNoTransferChecked,
        firstLeveData
      );
      const thirdLevelData = filterByPrice(minFilterValue, maxFilterValue, secondLevelData);
      setShownFilteredData(thirdLevelData);
    } else if (isOrderChecked === '3') {
      const firstLeveData = filterByDuration(filteredData);
      const secondLevelData = filterByTransfer(
        isTransferChecked,
        isNoTransferChecked,
        firstLeveData
      );
      const thirdLevelData = filterByPrice(minFilterValue, maxFilterValue, secondLevelData);
      setShownFilteredData(thirdLevelData);
    }
  }

  function createListOfBestPrices(dataOfFlights) {
    const airlines = [...new Set(dataOfFlights.map((item) => item.carrier))];
    const fitData = airlines.map((item, i) => {
      const allPrices = dataOfFlights.filter((flight) => flight.carrier === item);
      const bestPrice = Math.min(...allPrices.map((data) => Number(data.price)));
      return {
        name: item,
        bestPrice: bestPrice,
        checked: false
      };
    });
    setFitDataOfBestPrices(fitData);
  }

  return (
    <div className='App'>
      <Main
        renderedCards={shownFilteredData}
        onFilter={globalFilter}
        bestPrices={fitDataOfBestPrices}
      />
    </div>
  );
}

export default App;
