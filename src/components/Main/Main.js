import CardList from "../CardsList/CardList"
import Filter from "../Filter/Filter"

function Main({renderedCards}) {
    return (
        <div className='search-result-list'>
        <Filter/>
        <CardList renderedCards={renderedCards}/>
        </div>
    )
}

export default Main