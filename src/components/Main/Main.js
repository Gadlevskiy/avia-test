import CardList from "../CardsList/CardList"
import Filter from "../Filter/Filter"

function Main({renderedCards, onFilter, onSort}) {
    return (
        <div className='search-result-list'>
        <Filter onFilter={onFilter} onSort={onSort}/>
        <CardList renderedCards={renderedCards}/>
        </div>
    )
}

export default Main