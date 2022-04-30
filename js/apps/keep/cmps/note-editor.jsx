import { ColorInput } from "./color-input.jsx"
import { AddTxtNote } from "./dynmaic-note/add-txt-note.jsx"
import { AddTodoNote } from "./dynmaic-note/add-todo-note.jsx"
import { NoteImg } from "./dynmaic-note/note-img.jsx"
export class NoteEditor extends React.Component {

    state = {
        isOnEditNote: false
    }

    componentDidMount() {
        const { note } = this.props
        if (!note.id) {
            this.setState({ note: note })
        } else {
            this.setState({ note: note, isOnEditNote: true })
        }
    }


    handleChange = ({ target }, idx) => {
        const field = target.name
        let value = target.value
        if (idx === 0 || idx) {
            const todos = this.state.note.info.todos
            todos[idx].txt = value
            value = todos
        }
        this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }))
    }


    handleStyleChange = (color) => {
        this.setState((prevState) => ({ note: { ...prevState.note, style: { backgroundColor: color } }, isOnSetColor: false }))
    }


    onSetColor = () => {
        this.setState({ isOnSetColor: true })
    }


    onPinToggle = () => {
        const { isPinned } = this.state.note
        this.setState((prevState) => ({ note: { ...prevState.note, isPinned: !isPinned } }))
    }

    render() {

        const { note } = this.state
        if (!note) return <React.Fragment></React.Fragment>
        const { onAddNote, onSaveNote } = this.props
        const className = note.isPinned ? "fas fa-light fa-thumbtack" : "far fa-light fa-thumbtack"

        return (
            <section style={note.style} className="note-editor">
                <i className={className} onClick={this.onPinToggle}></i>
                <DynamicCmp note={note} handleChange={this.handleChange} selectedNote={this.props.selectedNote} onSaveEdit={this.props.onSaveEdit} onGoBack={this.props.onGoBack}/>
                <div>
                    {!this.state.isOnEditNote && <button onClick={() => onAddNote(note)}> Add Note </button>}
                    {this.state.isOnEditNote && <button onClick={() => onSaveNote(note)}> Save </button>}
                    <button onClick={this.onSetColor}><i className="fas fa-thin fa-palette"></i></button>
                    {this.state.isOnSetColor && <ColorInput handleStyleChange={this.handleStyleChange} />}
                </div>
            </section>
        )
    }
}



function DynamicCmp({ note, handleChange, selectedNote, onSaveEdit, onGoBack }) {

    const { info } = note
    if (!note) return <React.Fragment></React.Fragment>
    switch (note.type) {
        case 'note-txt':
            return <AddTxtNote note={note} handleChange={handleChange} />
        case 'note-todos':
            return <AddTodoNote note={note} handleChange={handleChange} />
        case 'note-img':
            return <NoteImg noteId={note.id} handleChange={handleChange} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} onGoBack={onGoBack}/>
        
    }
}








