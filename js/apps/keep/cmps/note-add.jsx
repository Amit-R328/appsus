import { NoteEditor } from "./note-editor.jsx"
import { noteService } from "../services/note.service.js"
export class NoteAdd extends React.Component {

    state = {
        isActive: false,
        type: ''
    }

    onNewNote = (type) => {
        this.setState((prevState) => ({ ...prevState, isActive: true, type }))
    }

    onAddNote = (note) => {
        noteService.addNote({note})
        .then( () =>{
            this.setState((prevState) => ({ ...prevState, isActive: false }))
            this.props.loadNotes()
        })
       

    }
    render() {

        const { isActive } = this.state
        console.log(this.state)
        return (
            <section className="note-add">
                {!isActive &&  <NewNote onNewNote={this.onNewNote}/>}
                {isActive && <NoteEditor onAddNote={this.onAddNote}/>}
            </section>
        )
    }
}

function NewNote({onNewNote}) {
    return (
        <React.Fragment>
            <button onClick={()=>{onNewNote('note-txt')}}>
                New Note
            </button>
            <button onClick={()=>{onNewNote('note-todos')}}>
                New List
            </button>
        </React.Fragment>
    )
}





