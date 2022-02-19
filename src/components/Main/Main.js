import CardList from "../CardsList/CardList"
import Filter from "../Filter/Filter"

function Main({renderedCards, onFilter, bestPrices}) {
    return (
        <div className='search-result-list'>
        <Filter onFilter={onFilter} bestPrices={bestPrices}/>
        <CardList renderedCards={renderedCards}/>
        </div>
    )
}

export default Main