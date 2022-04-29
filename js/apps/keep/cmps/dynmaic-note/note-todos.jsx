
const { Link } = ReactRouterDOM

export function NoteTodos(props) {

    const { note } = props
    const { onPinToggle } = props
    const { onEditNote } = props
    const className = note.isPinned ? "fas fa-light fa-thumbtack" : "far fa-light fa-thumbtack"


    return (
        <Link to={`/notes/${note.id}`}>
            <div style={note.style} className="note-txt" onClick={onEditNote}>
                <i className={className} onClick={(event) => { onPinToggle(event) }}></i>
                <span className="title">{note.info.title}</span>
                <ul>
                    <Todos todos={note.info.todos} />
                </ul>
            </div>
        </Link>
    )
}


function Todos({ todos }) {
    console.log(todos);
    return todos.map((todo, idx) => {
        return (
            <li>
                {todo}
            </li>

        )
    })
}
