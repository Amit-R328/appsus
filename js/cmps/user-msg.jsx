
const { Link, withRouter} = ReactRouterDOM

import { eventBusService } from "../services/event-bus-service.js";

 class _UserMsg extends React.Component{
    state = {
        msg: null
    }
    removeEventBus
    timeoutId

    componentDidMount(){
        this.removeEventBus = eventBusService.on('user-msg',(msg)=>{
            this.setState({msg}, () => {
                if (this.timeoutId) clearTimeout(this.timeoutId)
                this.timeoutId = setTimeout(this.onCloseMsg, msg.time)
            })
        })
    }

    componentWillUnmount(){
        this.removeEventBus()
    }

    onCloseMsg = () => {
        this.setState({msg: null})
        clearTimeout(this.timeoutId)
    }

    userAnswer = (answer) => {
        eventBusService.emit('user-answer', answer)
        this.onCloseMsg()
    }

    render(){
        const {msg} = this.state
        if(!msg) return <React.Fragment></React.Fragment>
        console.log(msg);
        if(msg.type === 'confirm') return (
            <React.Fragment>
                <section className="user-msg confirm">
                    <button className="user-msg-exit-btn" onClick={()=>{this.onCloseMsg; this.userAnswer('no')}}>X</button>
                    <h1>{msg.txt}</h1>
                    <div className="confirm-buttons">
                        <button onClick={()=>{this.userAnswer('yes')}}>Yes</button>
                        <button onClick={()=>{this.userAnswer('no')}}>No</button>
                    </div>
                </section>
                <div className="user-msg-screen"></div>
            </React.Fragment>
        )
        if(msg.type === 'message') return (
            <React.Fragment>
                <section className="user-msg message">
                    <button className="user-msg-exit-btn" onClick={this.onCloseMsg}>X</button>
                    <h1>{msg.txt}</h1>
                </section>
                <div className="user-msg-screen"></div>
            </React.Fragment>
        )
        if(msg.type === 'duplicate' || 'pined' || 'delete') return (
            <React.Fragment>
                <section className="user-msg message">
                    <button className="user-msg-exit-btn" onClick={this.onCloseMsg}>X</button>
                    <h1>{msg.txt}</h1>
                </section>
                <div className="user-msg-screen"></div>
            </React.Fragment>
        )
        if(msg.type === 'success') return (
            <React.Fragment>
                <section className="user-success-message">
                    {msg.txt}
                    <Link className="book-link" to={`/book/${bookId}`}>Check it out</Link>
                    <button className="user-msg-exit-btn" onClick={this.onCloseMsg}>X</button>
                </section>
            </React.Fragment>
        )
    }
}


export const UserMsg = withRouter(_UserMsg)