import { ColorInput } from "./color-input.jsx"
import { utilService } from "../../../services/util.service.js"

export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            colors: [],
            types: [],
            isPinned: false
        },
        isOnSetColor: false
    }



    handleTxtChange = ({ target }) => {
        const value = target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, txt: value } }))

    }




    onFilter = (ev) => {
        if (ev) ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    onPinToggle = () => {
        const bool = this.state.filterBy.isPinned
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, isPinned: !bool } }), () => {
            this.onFilter()
        })


    }

    onSetColor = () => {
        this.setState({ isOnSetColor: true })
    }

    handleChange = (val, label) => {
        let arr = this.state.filterBy[label]
        arr = utilService.editArr(arr, val)
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, label: arr }, isOnSetColor: false }), () => {
            this.onFilter()
        })
    }



    render() {
        const { txt, style, type, isPinned } = this.state.filterBy
        const className = this.state.filterBy.isPinned ? "fas fa-light fa-thumbtack" : "far fa-light fa-thumbtack"

        return <section className="note-filter">
            <form onSubmit={this.onFilter}>
                <input type="text" placeholder="Search"
                    value={txt} onChange={this.handleTxtChange} name="txt" />
                <i className={className} onClick={this.onPinToggle}></i>
                <button type="button" onClick={this.onSetColor}><i className="fas fa-thin fa-palette"></i></button>
                {this.state.isOnSetColor && <ColorInput handleStyleChange={this.handleChange} />}
                <button type="button" onClick={() => { this.handleChange('note-todos', 'types') }}>Todos</button>
                <button type="button" onClick={() => { this.handleChange('note-txt', 'types') }}>Txt</button>
            </form>
        </section>
    }
}