import { eventBusService } from "../../../services/event-bus-service.js"
import { GoogleBooks } from "../services/google-book.service.js"
import { utilService} from "../../../services/util.service.js"


export class AddBook extends React.Component {
    state = {
        bookName: '',
        items: []
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ bookName: value }, () => {
            this.debouncedGetBooksFromApi(value)
        })
    }

    getBookApi = (book) => {
        const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${book}`
        return axios.get(url).then(res => res.data).then(result => result.items).then(items => this.setState({items}))
    }

    debouncedGetBooksFromApi = utilService.debounce(this.getBookApi, 500)

    onAdd = (book) => {
        GoogleBooks.addGoogleBook(book)
        this.props.loadBooks()
        this.setState({bookName: '', items: []})
        eventBusService.emit('user-msg', { txt: 'book added', type: 'success',bookId: book.id, time: 1000 * 999999})
    }

    render() {
        return (
            <section className="add-book">
                <form>
                    <input type="text" placeholder="add book" value={this.state.bookName}
                        onChange={this.handleChange} name="bookName" />
                    <button>Add!</button>
                    {this.state.items.length > 0 && <BookOptions bookOptions={this.state.items} loadBooks={this.props.loadBooks} onAdd={this.onAdd}/>}
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
