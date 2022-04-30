import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, loadNotes, selectedNote, onSaveEdit, onGoBack }) {
    return (
        <section className="note-list list">
            {notes.map(note => <NotePreview note={note} key={note.id} loadNotes={loadNotes} selectedNote={selectedNote} onGoBack={onGoBack} onSaveEdit={onSaveEdit} />)}
        </section>
    )
}
