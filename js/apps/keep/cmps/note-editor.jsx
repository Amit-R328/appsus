


export class NoteEditor extends React.Component {

    state = {
        note: {
            info: {
                title: 'enter title',
                txt: 'enter txt'
            },
            type: "note-txt"
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info , [field]: value} } }))
    }

    render() {
        const { onAddNote } = this.props
        const { note } = this.state

        return (
            <section className="note-additor">
                <div>
                    <textarea name="title" rows="1" cols="50" onChange={this.handleChange}
                        value={note.info.title}>
                    </textarea>
                    <textarea name="txt" rows="2" cols="50" onChange={this.handleChange}
                   value={note.info.txt}>
                    </textarea>
                </div>
                <div>
                    <button onClick={() => onAddNote(note)}> Add Note </button>
                </div>
            </section>
        )
    }
}







