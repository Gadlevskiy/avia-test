import react from 'react';
import * as mainApi from '../../utils/MainApi';
import Main from '../Main/Main';

function App() {

  const [flights, setFlights] = react.useState({});
  const [bestPrices, setBestPrices] = react.useState({});

  react.useEffect(()=>{
    setFlights(mainApi.serverResponse.result.flights);
    setBestPrices(mainApi.serverResponse.result.bestPrices);
  },[])

  return (
    <div className='App'>
      <Main />
      <button onClick={console.log(bestPrices)}></button>
    </div>
  );
}

export default App;
