
import { BookFilter } from '../cmps/book-filter.jsx'
import { bookService } from '../services/book.service.js'
import {BookList} from '../cmps/book-list.jsx'
import {AddBook} from '../cmps/add-book.jsx'
export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }


    render() {
        const { books } = this.state

        return (
            <section className="book-app">
                <BookFilter onSetFilter={this.onSetFilter} />
                <AddBook loadBooks={this.loadBooks}/>
                <BookList books={books} />
            </section>
        )
    }
}