import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"


export class NoteApp extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
       noteService.query()
       .then(notes => this.setState((prevState) => ({...prevState, notes})))
    }

    render() {
        const { notes } = this.state

        return (
            <section className="note-app">
                <NoteList notes={notes} />
            </section>
        )

    }
}


