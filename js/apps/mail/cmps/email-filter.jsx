export class EmailFilter extends React.Component{
    state = {
        filterBy: {
            folder: 'inbox',
            searchTxt: '',
            isRead: false,
            isStared: false
        }
    }

    handleChange = ({target}) => {
        this.setState({filterBy: {...this.state.filterBy, searchTxt: target.value, folder: this.props.currentFolder}}, () =>{
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render(){
        return (
            <section className="email-filter">
                <input type="text" placeholder="Search" onChange={this.handleChange} autoComplete="off"/>
            </section>
        )
    }
}