import { eventBusService } from "../../../services/event-bus-service.js"
import { GoogleBooks } from "../services/google-book.service.js"

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

        console.log(this.state.bookOptions)

    }

    render() {
        return (
            <section className="add-book">
                <form>
                    <input type="text" placeholder="add book" value={this.state.bookName}
                        onChange={this.handleChange} name="bookName" />
                    <button>Add!</button>
                    {this.state.bookOptions.length && <BookOptions bookOptions={this.state.bookOptions} loadBooks={this.props.loadBooks} />}
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

    onAdd = (book) => {
        GoogleBooks.addGoogleBook(book)
        this.props.loadBooks()
        eventBusService.emit('user-msg', {
            type: 'success',
            txt: 'Added book📚',
            bookId: book.id,
        })
    }

    render() {
        return (
            <section className="book-options">
                <ul>
                    {this.state.options.map(item => <li key={item.id} onClick={() => { this.onAdd(item) }} value={item.id}>{item.volumeInfo.title}</li>)}
                </ul>
            </section>
        )
    }
}
