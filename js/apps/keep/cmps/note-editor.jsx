import { ColorInput } from "./color-input.jsx"

export class NoteEditor extends React.Component {

    state = {
        note: {
            info: {
                title: 'enter title',
                txt: 'enter txt'
            },
            type: "note-txt",
            isOnSetColor: false,
            isPinned: false
        },
        isOnEditNote: false
    }

    componentDidMount() {
        const { note } = this.props
        if (!note) return
        this.setState({ note: note, isOnEditNote: true })
    }



    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }))
    }

    handleStyleChange = (color) => {
        this.setState((prevState) => ({ note: { ...prevState.note, style: { backgroundColor: color } }, isOnSetColor: false }))
    }

    onSetColor = () => {
        this.setState({ isOnSetColor: true })
    }
    onPinToggle = () => {

        this.setState((prevState) => ({ note: { ...prevState.note, isPinned: !this.state.note.isPinned } }))
    }

    render() {
        const { onAddNote } = this.props
        const { note } = this.state
        const { onSaveNote } = this.props
        const { onPinToggle } = this.props
        const className = note.isPinned ? "fas fa-light fa-thumbtack" : "far fa-light fa-thumbtack"



        return (
            <section style={note.style} className="note-editor">
                <i className={className} onClick={onPinToggle}></i>
                <div>
                    <textarea style={{ ...note.style, fontWeight: 700 }} name="title" rows="1" cols="30" onChange={this.handleChange}
                        value={note.info.title}>
                    </textarea>
                    <textarea style={note.style} name="txt" rows="2" cols="50" onChange={this.handleChange}
                        value={note.info.txt}>
                    </textarea>
                </div>
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








