import { eventBusService } from "../../../services/event-bus-service.js"
import { GoogleBooks } from "../services/google-book.service.js"
const { Link } = ReactRouterDOM

export class AddBook extends React.Component {
    state = {
        bookName: '',
        bookOptions: []
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ bookName: value })

        const result = GoogleBooks.getBookApi(value)
            .then(data => this.setState({ bookOptions: data.items }))

    }

    onAdd = (book) => {
        GoogleBooks.addGoogleBook(book)
        this.props.loadBooks()
        this.setState({bookName: '', bookOptions: []})
        eventBusService.emit('user-msg', { txt: 'book added', type: 'success',bookId: book.id, time: 1000 * 999999 })
    }

    render() {
        return (
            <section className="add-book">
                <form>
                    <input type="text" placeholder="add book" value={this.state.bookName}
                        onChange={this.handleChange} name="bookName" />
                    <button>Add!</button>
                    {this.state.bookOptions.length && <BookOptions bookOptions={this.state.bookOptions} loadBooks={this.props.loadBooks} onAdd={this.onAdd}/>}
                </form>
            </section>
        )
    }
}

class BookOptions extends React.Component {
    state = {
        options: this.props.bookOptions,
        selectedOption: '',
    }



    render() {
        return (
            <section className="book-options">
                <ul>
                    {this.state.options.map(item => <li key={item.id} value={item.id}>{item.volumeInfo.title}<span onClick={() => this.props.onAdd(item)}> + </span></li>)}
                </ul>
            </section>
        )
    }
}
