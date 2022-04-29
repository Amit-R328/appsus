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
            .then(this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos: todos }}})))
    }

    onDeleteRow =(idx) =>{
        const { todos } = this.state.note.info
        noteService.deleteRow(todos, idx)
            .then(this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos: todos }}})))
    }





    render() {
        const { handleChange } = this.props
        const { note } = this.props
        const { todos } = note.info
        return (
            <div>
                <textarea style={{ ...note.style, fontWeight: 700 }} name="title" rows="1" cols="30" onChange={handleChange}
                    value={note.info.title}>
                </textarea>
                <Todos todos={todos} handleChange={handleChange} style={note.style} onDeleteRow={this.onDeleteRow}/>
                <button onClick={this.onAddRow}>Add Row</button>
            </div>
        )
    }

}

function Todos({ todos, handleChange, style, onDeleteRow}) {
    return todos.map((todo, idx) => {
        return (
            <div className="todo-box" key={idx}>
                <i class="far fa-light fa-stop"></i>
            <textarea style={style} name="todos" rows="1" cols="50" onChange={(target) => handleChange(target, idx)}
                value={todo} >
            </textarea>
            <button onClick={()=>onDeleteRow(idx)} >X</button>
            </div>
        )
    })
}
