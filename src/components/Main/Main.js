import CardList from "../CardsList/CardList"
import Filter from "../Filter/Filter"

function Main({renderedCards, onFilter, onSort, onFilterByPrice}) {
    return (
        <div className='search-result-list'>
        <Filter onFilter={onFilter} onSort={onSort} onFilterByPrice={onFilterByPrice}/>
        <CardList renderedCards={renderedCards}/>
        </div>
    )
}

export default Main