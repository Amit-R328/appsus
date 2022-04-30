import { noteService } from "../services/note.service.js";
import { NoteEditor } from "../cmps/note-editor.jsx";

export class NoteDetails extends React.Component {


    state = {
        note: null,
        isOnSetColor: false,
    }


    componentDidMount() {
        const noteId = this.props.match.params.noteId
        noteService.getById(noteId)
            .then((note) => this.setState({ note }))
    }


    onSaveNote = (note) => {
        noteService.setNote(note, note.id)
            .then(this.props.history.push('/notes'))
    }


    onPinToggle = () => {
        noteService.setPin(this.state.note.id)
            .then(() => {
                this.setState((prevState) => ({ note: { ...prevState.note, isPinned: !this.state.note.isPinned } }))
            })
    }


    onDeleteNote = () => {
        noteService.deleteNote(this.state.note.id)
            .then(this.props.history.push('/notes'))
    }



    render() {
        const { note } = this.state
        if (!note) return <React.Fragment></React.Fragment>

        return (
            <section className="note-details" >
                <NoteEditor note={note} onSaveNote={this.onSaveNote} onPinToggle={this.onPinToggle}>
                </NoteEditor>
                <button onClick={this.onDeleteNote}className="fas fa-trash-alt"></button>
            </section>
        )
    }
}


