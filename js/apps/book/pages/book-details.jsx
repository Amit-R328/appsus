import { utilService } from "../../../services/util.service.js"
import { bookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {

    state = {
        book: null
    }

    componentDidMount() {
        console.log('in');
        this.loadBook()
    }


    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then(book => {
                if (!book) return this.props.history.push('/')
                this.setState({ book })
            })
    }

    onClose = () => {
        this.props.history.push('/book')
    }

    onRemove = () => {
        bookService.remove(this.state.book.id)
            .then(this.onClose)
    }


    render() {
        const { book } = this.state
        if (!book) return <section> no book yet!</section>
        const price = book.listPrice.amount
        const currencySymbol = utilService.getCurrencySymbol(book.listPrice.currencyCode)
        const priceColor = (price < 20) ? 'green' :
            (price > 150) ? 'red' : '';
        const pageStr = (book.pageCount < 100) ? '(Light Reading)' :
            (book.pageCount > 500) ? '(Long reading)' :
                (book.pageCount > 200) ? '(Decent Reading)' : '';
        const yearDiff = (new Date).getFullYear() - book.publishedDate
        const yearStr = (yearDiff > 10) ? '(Veteran Book)' :
            (yearDiff < 1) ? '(New!)' : '';
        const prevBook = bookService.getNextOrPrev(book.id, false)
        const nextBook = bookService.getNextOrPrev(book.id, true)

        return (
            <section className="book-details">
                <header>
                    <h2>{book.title}</h2>
                    <h3>{book.subtitle}</h3>
                </header>
                <section className="details-area">
                    <h3>Authors: {book.authors}</h3>
                    <h3>Published Year: {book.publishedDate} {yearStr}</h3>
                    <h3>Categories: {book.categories.join(' ')}</h3>
                    <h3>Price: <span className={priceColor}>{price}</span> {currencySymbol}</h3>
                    <h3>Language: {book.language}</h3>
                    <h3>Page Count: {book.pageCount} {pageStr}</h3>
                    <p>{book.description}</p>
                    <section className="btn-area">
                        <button onClick={this.onClose}>Close</button>
                        <button onClick={this.onRemove}>Delete</button>
                        <Link to={`/book/review/${book.id}`}><button>Reviews</button></Link>
                    </section>
                </section>
                <div className="img-container">
                    <img src={book.thumbnail} />
                </div>
                {book.listPrice.isOnSale && <div className="sale-box">SALE!</div>}
                <Link className="prev-btn" to={`/book/${prevBook}`}>Prev Book</Link>
                <Link className="next-btn" to={`/book/${nextBook}`}>Next Book</Link>
            </section>
        )
    }
}