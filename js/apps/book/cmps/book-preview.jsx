import { utilService } from "../../../services/util.service.js"
const { Link } = ReactRouterDOM

export function BookPreview({ book }) {

    return (
        <Link to={`/book/${book.id}`}>
            <section className="book-preview">
                <h2>{book.title}</h2>
                <div className="img-container">
                    <img src={book.thumbnail} />
                </div>
                <h3>Price: {book.listPrice.amount} {utilService.getCurrencySymbol(book.listPrice.currencyCode)}</h3>
            </section>
        </Link>
    )
}





