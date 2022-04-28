import { noteService } from "../services/note.service.js";
import { ColorInput } from "../cmps/color-input.jsx";
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
        note.isPinned = this.state.note.isPinned
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
        const className = note.isPinned ? "fas fa-light fa-thumbtack" : "far fa-light fa-thumbtack"

        return (
            <section className="note-details" >

                  {/* <i className={className} onClick={this.onPinToggle}></i> */}

               <NoteEditor note={note} onSaveNote={this.onSaveNote} onPinToggle={this.onPinToggle}>
               </NoteEditor>
              <button onClick={this.onDeleteNote}>Delete</button>

            </section>
        )

    }
}


{/* <section className="note-editor" style={note.style}>

<i className={className} onClick={this.onPinToggle}></i>
<textarea style={{ ...note.style, fontWeight: 700 }} name="title" cols="50" onChange={this.handleChange}
    value={note.info.title}>
</textarea>
<textarea style={note.style} name="txt" cols="50" onChange={this.handleChange}
    value={note.info.txt}>
</textarea>

<button onClick={this.onSetColor}><i className="fas fa-thin fa-palette"></i></button>
{this.state.isOnSetColor && <ColorInput handleStyleChange={this.handleStyleChange} />}
<button onClick={this.onSaveNote}>Save</button>
<button onClick={this.onDeleteNote}>Delete</button>

</section>
 */}
{/* <section style={note.style} className="note-editor">
    <div>
        <textarea style={{ ...note.style, fontWeight: 700 }} name="title" rows="1" cols="50" onChange={this.handleChange}
            value={note.info.title}>
        </textarea>
        <textarea style={note.style} name="txt" rows="2" cols="50" onChange={this.handleChange}
            value={note.info.txt}>
        </textarea>
    </div>
    <div>
        <button onClick={() => onAddNote(note)}> Add Note </button>
        <button onClick={this.onSetColor}><i className="fas fa-thin fa-palette"></i></button>
        {this.state.isOnSetColor && <ColorInput handleStyleChange={this.handleStyleChange} />}
    </div>
</section> */}
