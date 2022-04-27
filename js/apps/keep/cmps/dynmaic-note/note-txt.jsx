

export function NoteTxt(note){
    console.log(note)
    return <div style={note.style} className="note-txt">
        note txt!!
        <h3>{note.info.title}</h3>
        <p>{note.info.txt}</p>
    </div>
}