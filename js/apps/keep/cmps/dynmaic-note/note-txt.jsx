
export function NoteTxt(props) {
    const {note} = props
    const {onPinToggle} = props
    const className = note.isPinned ? "fas fa-light fa-thumbtack" : "fa-duotone fa-thumbtack"
    return (
        <div style={note.style} className="note-txt">
            <i className={className} onClick={()=>{onPinToggle(note.id)}}></i>
            <span className="title">{note.info.title}</span>
            <p className="txt">{note.info.txt}</p>
        </div>
    )
}