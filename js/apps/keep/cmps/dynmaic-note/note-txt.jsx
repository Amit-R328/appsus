

export function NoteTxt(note) {
    return (
        <div style={note.style} className="note-txt">
            <span className="title">{note.info.title}</span>
            <p className="txt">{note.info.txt}</p>
        </div>
    )
}