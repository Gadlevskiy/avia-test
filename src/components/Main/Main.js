import CardList from "../CardsList/CardList"
import Filter from "../Filter/Filter"

function Main() {
    return (
        <div className='search-result-list'>
        <Filter/>
        <CardList/>
        </div>
    )
}

export default Main