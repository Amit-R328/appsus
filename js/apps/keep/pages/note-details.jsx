import { noteService } from "../services/note.service.js";
import { ColorInput } from "../cmps/color-input.jsx";

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

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }))
    }
    handleStyleChange = (color) => {
        noteService.setColor(color, this.props.note.id)
            .then(() => {
                this.setState((prevState) => ({ note: { ...prevState.note, style: { ...prevState.note.style, backgroundColor: color } }, isOnSetColor: false }))
            })

    }
    handleStyleChange = (color) => {
        this.setState((prevState) => ({ note: { ...prevState.note, style: { backgroundColor: color } }, isOnSetColor: false }))
    }

    onSetColor = () => {
        this.setState({ isOnSetColor: true })
    }

    onSaveNote = () => {
        noteService.setNote(this.state.note, this.state.note.id)
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
        console.log(note);
        const className = note.isPinned ? "fas fa-light fa-thumbtack" : "far fa-light fa-thumbtack"

        return (
            <section className="note-details" style={note.style}>

                <i className={className} onClick={this.onPinToggle}></i>
                <input type="text" name="title" value={note.info.title} onChange={this.handleChange} />
                <input type="text" name="txt" value={note.info.txt} onChange={this.handleChange} />
                <button onClick={this.onDeleteNote}>Delete</button>

                <button onClick={this.onSetColor}><i className="fas fa-thin fa-palette"></i></button>
                {this.state.isOnSetColor && <ColorInput handleStyleChange={this.handleStyleChange} />}
                <button onClick={this.onSaveNote}>Save</button>

            </section>
        )

    }
}

