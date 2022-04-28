import { NoteTxt } from "./dynmaic-note/note-txt.jsx"
import { noteService } from "../services/note.service.js"
import { ColorInput } from "./color-input.jsx"

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

    render() {
        const { note } = this.props
        if (!note) return <React.Fragment></React.Fragment>
        return (
            <section className="note-container">
                <DynamicCmp note={note} />
                <section className="note-edit">
                    <button onClick={this.onDeleteNote}>delete</button>
                    <button onClick={this.onSetColor}>color</button>
                    {this.state.isOnSetColor && <ColorInput handleStyleChange={this.handleStyleChange} />}
                </section>
            </section>
        )
    }



}

function DynamicCmp({ note }) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt {...note} />
    }
}