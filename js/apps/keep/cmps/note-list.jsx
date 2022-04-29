import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, loadNotes }) {
    return (
        <section className="note-list list">
            {notes.map(note => <NotePreview note={note} key={note.id} loadNotes={loadNotes} />)}
        </section>
    )
}
