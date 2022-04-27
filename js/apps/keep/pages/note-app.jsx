import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"


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
                <NoteAdd loadNotes={this.loadNotes}/>
                <NoteList notes={notes} />
            </section>
        )

    }
}


