import { bookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM

export class BookReview extends React.Component {


    state = {
        book: null,
        review: {
            name: 'Books Reader',
            rate: 5,
            txt: ''
        }
    }

    componentDidMount() {
        this.loadBook()
    }


    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then(book => {
                this.setState({ book })
            })
    }




    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }))
    }


    onAddReview = () => {
        bookService.addReview(this.state.review, this.state.book.id)
    }

    get reviews() {
        const { book } = this.state
        if (!book) return <React.Fragment></React.Fragment>
        if (!book.reviews) return <div>No Reviews Yet!</div>
        return book.reviews.map(review => {
            return (
                <div className="review-container" key={book.id}>
                    <h3>By: {review.name}</h3>
                    <h4>About The Book:</h4>
                    <p> {review.txt}</p>
                    <h4>Rate: {review.rate}</h4>
                </div>
            )
        })
    }



    render() {
        const { review } = this.state
        return (
            <section className="book-review">
                <section className="book-prev-reviews">
                    {this.reviews}
                </section>
                <form className="add-review" onSubmit={this.onAddReview}>
                    <div><label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={review.name} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="rate">Rate</label>
                        <select name="rate" id="rate" value={review.rate} onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <label for="txt">Review:</label>

                        <textarea id="txt" name="txt" rows="4" cols="50" value={review.txt} onChange={this.handleChange}>
                        </textarea>
                    </div>
                    <button>Add Review</button>
                </form>
            </section>
        )
    }


}
