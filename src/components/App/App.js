import react from 'react';
import * as mainApi from '../../utils/MainApi';
import Main from '../Main/Main';

function App() {
  const [fitDataOfFlights, setFitDataOfFlights] = react.useState([]);
  const [fitDataOfBestPrices, setFitDataOfBestPrices] = react.useState([]);
  const [filteredData, setFilteredData] = react.useState([]);
  const [shownFilteredData, setShownFilteredData] = react.useState([]);

  // обрабатываем "ответ api"
  react.useEffect(() => {
    convertApiResponse();
  }, []);

  // первая фильтрация(initial)
  react.useEffect(() => {
    globalFilter('1', false, false, '0', '100000', fitDataOfBestPrices);
  }, [filteredData]);

  react.useEffect(() => {
    setShownFilteredData(fitDataOfFlights);
    createListOfBestPrices(fitDataOfFlights);
  }, [fitDataOfFlights]);

  // Функция обрабатывает входные данные, собирает их вместе и записывает в стейт
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

  // Функция сортирует переданный массив от большего значения поля price к меньшему
  function filterFromHightToLow(data) {
    return data.sort((a, b) => {
      return b.price - a.price;
    });
  }

  // Функция сортирует переданный массив от меньшего значения поля price к большему
  function filterFromLowToHight(data) {
    return data.sort((a, b) => {
      return a.price - b.price;
    });
  }

  // Функция сортирует переданный массив по возрастанию по времени в пути
  function filterByDuration(data) {
    return data.sort((a, b) => {
      return a.firstRun.travelDuration - b.firstRun.travelDuration;
    });
  }

  // Функция фильтрует переданный массив и возвращает массив удовлетваряющий условию
  function filterByOneTransfer(data) {
    return data.filter((flight) => {
      // если на обоих маршрутах по 1 пересадке
      if (flight.firstRun.transfer && flight.secondRun.transfer) {
        return false;
        // если на обоих маршрутах нет пересадок
      } else if (!flight.firstRun.transfer && !flight.secondRun.transfer) {
        return false;
      } else {
        return true;
      }
    });
  }

  // Функция фильтрует переданный массив и возвращает массив удовлетваряющий условию
  function filterByNoTransfer(data) {
    return data.filter((flight) => {
      // если на обоих маршрутах нет пересадок
      if (!flight.firstRun.transfer && !flight.secondRun.transfer) {
        return true;
      } else {
        return false;
      }
    });
  }

  // Функция фильтрует переданный массив и возвращает массив удовлетваряющий условию
  function filterByCocatTransfer(data) {
    return data.filter((flight) => {
      // если оба маршрута с 1 пересадкой
      if (flight.firstRun.transfer && flight.secondRun.transfer) {
        return false;
      } else {
        return true;
      }
    });
  }

  // Функция фильтрует переданный массив и возвращает массив удовлетваряющий условию
  function filterByPrice(min, max, data) {
    return data.filter((flight) => {
      return Number(min) <= flight.price && flight.price <= Number(max);
    });
  }
  
  // Функция обработки фильтра по наличию и/или отсутсвию пересадок
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

  // Функция возвращает массив перелетов, которые соответсвуют выбранным авиакомпаниям из филтра по названию
  function filterByBestPrices(dataOfChecked, allData) {
    // записываю в переменную все отмеченные компании(checked === true)
    const isAllCheckedFalse = dataOfChecked.filter((bit) => bit.checked === true);
    // если массив не пустой начинается фильтрация (есть хотя бы одно значение true)
    if (!(isAllCheckedFalse.length === 0)) {
      return allData.filter((data) => {
        const checked = dataOfChecked.filter((item) => item.name === data.carrier);
        // пропускаю все значения если передали пустой массив(решение для комфортной фильтрации при первом рендере)
        if (dataOfChecked.length === 0) {
          return true;
        // проверка на нажатую отметку по полю checked
        } else if (checked[0].checked) {
          return true;
        } else {
          return false;
        }
      });
      // если массив пустой возвращаем исходные данные
    } else {
      return allData;
    }
  }

  // Функция собирает в себя всю логику всех фильтров формы, каскадная проверка
  function globalFilter(
    isOrderChecked,
    isTransferChecked,
    isNoTransferChecked,
    minFilterValue,
    maxFilterValue,
    values
  ) {
    if (isOrderChecked === '1') {
      const firstLeveData = filterFromLowToHight(filteredData);
      const secondLevelData = filterByTransfer(
        isTransferChecked,
        isNoTransferChecked,
        firstLeveData
      );
      const thirdLevelData = filterByPrice(minFilterValue, maxFilterValue, secondLevelData);
      const fourthLevelData = filterByBestPrices(values, thirdLevelData);
      setShownFilteredData(fourthLevelData);
    } else if (isOrderChecked === '2') {
      const firstLeveData = filterFromHightToLow(filteredData);
      const secondLevelData = filterByTransfer(
        isTransferChecked,
        isNoTransferChecked,
        firstLeveData
      );
      const thirdLevelData = filterByPrice(minFilterValue, maxFilterValue, secondLevelData);
      const fourthLevelData = filterByBestPrices(values, thirdLevelData);
      setShownFilteredData(fourthLevelData);
    } else if (isOrderChecked === '3') {
      const firstLeveData = filterByDuration(filteredData);
      const secondLevelData = filterByTransfer(
        isTransferChecked,
        isNoTransferChecked,
        firstLeveData
      );
      const thirdLevelData = filterByPrice(minFilterValue, maxFilterValue, secondLevelData);
      const fourthLevelData = filterByBestPrices(values, thirdLevelData);
      setShownFilteredData(fourthLevelData);
    }
  }

  // Функция выдает список компаний перевозчиков с их лучшей ценой
  function createListOfBestPrices(dataOfFlights) {
    // Set - коллекция которая хранит в себе уникальные значения
    const airlines = [...new Set(dataOfFlights.map((item) => item.carrier))];
    // Вычисляем лучшую цену перелета для каждого перевозчика
    const fitData = airlines.map((item) => {
      const allPrices = dataOfFlights.filter((flight) => flight.carrier === item);
      const bestPrice = Math.min(...allPrices.map((data) => Number(data.price)));
      // Возвращаем обьект для отображения в форме
      return {
        name: item,
        bestPrice: bestPrice,
        checked: false,
      };
    });
    // весь массив ушел в стейт
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
