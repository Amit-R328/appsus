import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"

export class NoteApp extends React.Component {

    state = {
        notes: null,
        filterBy: null,
    }


    componentDidMount() {
        this.loadNotes()
    }


    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(notes => this.setState((prevState) => ({ ...prevState, notes })))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {this.loadNotes(filterBy)})
    }



    render() {
        const { notes } = this.state
        if (!notes) return <React.Fragment></React.Fragment>

        return (
            <section className="note-app">
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteAdd loadNotes={this.loadNotes} />
                <NoteList notes={notes} loadNotes={this.loadNotes} />
            </section>
        )
    }
}


