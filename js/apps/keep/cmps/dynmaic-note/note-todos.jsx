const { Link } = ReactRouterDOM

export function NoteTodos(props) {

    const { note, onPinToggle, onEditNote, onDoneToggle } = props
    const className = note.isPinned ? "fas fa-light fa-thumbtack" : "far fa-light fa-thumbtack"


    return (
        <Link to={`/notes/${note.id}`}>
            <div style={note.style} className="note-txt" onClick={onEditNote}>
                <i className={className} onClick={(event) => { onPinToggle(event) }}></i>
                <span className="title">{note.info.title}</span>
                <ul>
                    <Todos todos={note.info.todos} onDoneToggle={onDoneToggle} />
                </ul>
            </div>
        </Link>
    )
}


function Todos({ todos, onDoneToggle }) {
    return todos.map((todo, idx) => {
        const className = todo.isDone ? 'done' : ''
        return (
            <div className="todo-box" key={idx}>
                <i className="far fa-light fa-stop" onClick={(event) => onDoneToggle(idx, !todo.isDone, event)}></i>
                <li className={className} >
                    {todo.txt}
                </li>
            </div>
        )
    })
}


