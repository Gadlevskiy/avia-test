import CardList from "../CardsList/CardList"
import Filter from "../Filter/Filter"

function Main({renderedCards, onFilter}) {
    return (
        <div className='search-result-list'>
        <Filter onFilter={onFilter}/>
        <CardList renderedCards={renderedCards}/>
        </div>
    )
}

export default Main