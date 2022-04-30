import { noteService } from "../../services/note.service.js"
export class AddTodoNote extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        const { note } = this.props
        this.setState({ note: note })
    }

    onAddRow = () => {
        const { todos } = this.state.note.info
        noteService.addRow(todos)
            .then(this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos: todos } } })))
    }

    onDeleteRow = (idx) => {
        const { todos } = this.state.note.info
        noteService.deleteRow(todos, idx)
            .then(this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos: todos } } })))
    }

    onDoneToggle = (idx, bool) => {
        const { todos } = this.state.note.info
        noteService.doneToggle(todos, idx, bool)
            .then(this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos: todos } } })))
    }




    render() {
        const { handleChange, note } = this.props
        const { todos } = note.info
        return (
            <div>
                <textarea style={{ ...note.style, fontWeight: 700 }} name="title" rows="1" cols="30" onChange={handleChange}
                    value={note.info.title}>
                </textarea>
                <Todos todos={todos} handleChange={handleChange} style={note.style} onDoneToggle={this.onDoneToggle} onDeleteRow={this.onDeleteRow} />
                <button onClick={this.onAddRow}>Add Row</button>
            </div>
        )
    }

}

function Todos({ todos, handleChange, style, onDoneToggle, onDeleteRow }) {
    return todos.map((todo, idx) => {
        const className = todo.isDone ? 'done' : ''

        return (
            <div className="todo-box" key={idx}>
                <i className="far fa-light fa-stop" onClick={() => onDoneToggle(idx, !todo.isDone)}></i>
                <textarea className={className} style={style} name="todos" rows="1" cols="50" onChange={(target) => handleChange(target, idx)}
                    value={todo.txt} >
                </textarea>
                <button onClick={() => onDeleteRow(idx)} >X</button>
            </div>
        )
    })
}
