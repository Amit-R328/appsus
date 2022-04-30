import { NoteEditor } from "./note-editor.jsx"
import { noteService } from "../services/note.service.js"

export class NoteAdd extends React.Component {

    state = {
        isActive: false,
    }

    onNewNote = (type) => {
        noteService.getNoteByType(type)
            .then((note) => this.setState((prevState) => ({ ...prevState, isActive: true, note })))

    }

    onAddNote = (note) => {
        noteService.addNote({ note })
            .then(() => {
                this.setState((prevState) => ({ ...prevState, isActive: false }))
                this.props.loadNotes()
            })
    }


    render() {
        const { isActive } = this.state
        return (
            <section className="note-add">
                {!isActive && <NewNote onNewNote={this.onNewNote} />}
                {isActive && <NoteEditor onAddNote={this.onAddNote} note={this.state.note} isOnEdit={true}/>}
                {/* {isActive && <NoteEditor onAddNote={this.onAddNote} note={this.state.note} isOnEdit={true} selectedNote={this.props.selectedNote} onSaveEdit={this.props.onSaveEdit} onGoBack={this.props.onGoBack} />} */}
            </section>
        )
    }
}



function NewNote({ onNewNote }) {
    return (
     
            <div className="add-box">
            <div className="add-note-btn" onClick={() => { onNewNote('note-txt') }}>
                New Note
            </div>
            <div className="fas fa-regular fa-list" onClick={() => { onNewNote('note-todos') }}></div>
{/*             
            <button onClick={() => {onNewNote('note-img')}}>
                New Img
            </button> */}
      </div>
    )
}





