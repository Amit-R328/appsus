import { NoteTxt } from "./dynmaic-note/note-txt.jsx"
import { noteService } from "../services/note.service.js"
import { ColorInput } from "./color-input.jsx"
import { NoteTodos } from "./dynmaic-note/note-todos.jsx"
import { NoteImg } from "./dynmaic-note/note-img.jsx"

export class NotePreview extends React.Component {

    state = {
        note: null,
        isOnSetColor: false
    }


    componentDidMount() {
        this.setState({ note: this.props.note })
    }


    handleStyleChange = (color) => {
        noteService.setColor(color, this.props.note.id)
            .then(() => {
                this.setState((prevState) => ({ note: { ...prevState.note, style: { ...prevState.note.style, backgroundColor: color } }, isOnSetColor: false }))
                this.props.loadNotes()
            })
    }


    onSetColor = () => {
        this.setState({ isOnSetColor: true })
    }


    onDeleteNote = () => {
        noteService.deleteNote(this.props.note.id)
            .then(() => {
                this.setState({ note: null })
                this.props.loadNotes()
            })
    }


    onDoneToggle = (idx, bool, ev) => {
        ev.preventDefault()
        const { todos } = this.state.note.info
        const noteId = this.state.note.id
        noteService.doneToggle(todos, idx, bool, noteId)
            .then(this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos: todos } } })))
    }


    onPinToggle = (ev) => {
        ev.preventDefault()
        noteService.setPin(this.props.note.id)
            .then(() => {
                this.setState((prevState) => ({ note: { ...prevState.note, isPinned: !this.state.isPinned } }))
                this.props.loadNotes()
            })
    }



    render() {
        const { note, selectedNote, onSaveEdit, onGoBack } = this.props
        if (!note) return <React.Fragment></React.Fragment>
        return (
            <section className="note-container">
                <DynamicCmp note={note} onDoneToggle={this.onDoneToggle} selectedNote={selectedNote} onSaveEdit={onSaveEdit} onGoBack={onGoBack} onPinToggle={this.onPinToggle} />
                <section className="note-edit">
                    <button onClick={this.onDeleteNote}>delete</button>
                    <button onClick={this.onSetColor}><i className="fas fa-thin fa-palette"></i></button>
                    {this.state.isOnSetColor && <ColorInput handleStyleChange={this.handleStyleChange} />}
                </section>
            </section>
        )
    }
}


function DynamicCmp({ note, onPinToggle, onDoneToggle, selectedNote, onGoBack, onSaveEdit}) {

    const { info } = note

    switch (note.type) {
        case 'note-txt':
            return <NoteTxt note={note} onPinToggle={onPinToggle} />
        case 'note-todos':
            return <NoteTodos note={note} onDoneToggle={onDoneToggle} onPinToggle={onPinToggle} />
        case 'note-img':
            return <NoteImg noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} onGoBack={onGoBack}/>
        
    }
}