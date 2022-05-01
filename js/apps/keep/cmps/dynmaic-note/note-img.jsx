const { Link } = ReactRouterDOM

export function NoteImg(props) {

    const { note, onPinToggle, onEditNote } = props
    const className = note.isPinned ? "fas fa-light fa-thumbtack" : "far fa-light fa-thumbtack"
    return (
        <Link to={`/notes/${note.id}`}>
            <div style={note.style} className="note-txt note-img" onClick={onEditNote}>
                <i className={className} onClick={(event) => { onPinToggle(event) }}></i>
                <div className="img-container">
                    <img src={note.info.url} alt="" className="img"/>
                </div>
                <span className="title">{note.info.title}</span>
            </div>
        </Link>
    )
}