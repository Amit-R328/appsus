import { emailService } from "../services/email-service.js"
import { EmailList } from "../cmps/email-list.jsx"
import { EmailCompose } from "../cmps/email-compose.jsx"
import { EmailFilter } from "../cmps/email-filter.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"

export class EmailApp extends React.Component {
    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
        isNewEmail: false,
        draft: null,
        checkedEmails: [],
        isNavBarExpend: false,
        menuIsHover: false,
    }

    foldersNav = React.createRef()

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        const emails = emailService.query(this.state.filterBy)
            .then(emails => {
                this.setState({
                    emails, checkedEmails: emails.filter(
                        email => email.isChecked
                    )
                })
            })
    }

    onSetFolderFilter = (folder) => {
        let thisFilterBy = this.state.filterBy
        const isStared = folder === 'starred' ? true : false

        if(!thisFilterBy){
            thisFilterBy = {
                folder,
                searchTxt : '',
                isRead: false,
                isStared: isStared
            }
        }else {
            thisFilterBy = {...thisFilterBy, folder: folder}
        }
        this.setState({...this.state, filterBy: thisFilterBy}, this.loadEmails)
    }

    onFolderNavChange = (isOn) => {
        if(isOn) this.setState({isNavBarExpend: true})
        else this.setState({isNavBarExpend: false})
    }

    onOpenMenu = () => {
        this.foldersNav.current.classList.add('on-hover')
        this.setState({menuIsHover: true})
    }

    onCloseMenu = () => {
        this.foldersNav.current.classList.remove('on-hover')
        this.setState({menuIsHover: false})
    }

    onSelectedEmail = (email) => {
        this.setState({ selectedEmail: email })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    onCheckAllEmails = (isChecked) => {
        emailService.toggleCheckAllEmails(this.state.filterBy, isChecked)
        this.loadEmails()
    }

    onCreateNewEmail = (isOn) => {
        this.setState({isNewEmail: isOn})
    }

    onEmailReadToggle=(emailId) => {
        emailService.toggleEmailRead(emailId)
        eventBusService.emit('update-unread-emails', emailService.getUnReadEmailCount())
        this.loadEmails()
    }

    render() {
        const { emails, selectedEmail, isNewEmail, draft, isNavBarExpend, menuIsHover } = this.state
        if (!emails) return <h1>Loading...</h1>
        return (
            <section className="email-app">
                <div className="email-left-layout">
                    <nav  ref={this.foldersNav} className="emails-folder" onMouseEnter={()=>{this.onFolderNavChange(true)}} onMouseLeave={() => {this.onFolderNavChange(false)}}>
                        <i title="compose new email" className="folder-content fas fa-plus new-compose" onClick={() => { this.onCreateNewEmail(true); this.onCloseMenu() }}><span>new email</span></i>
                        <i title="view inbox" className="folder-content far fa-envelope" onClick={() => { this.onSetFolderFilter('inbox'); this.onCloseMenu() }}><span>inbox</span></i>
                        <i title="view all starred emails" className="folder-content far fa-star" onClick={() => { this.onSetFolderFilter('starred'); this.onCloseMenu() }}><span>starred</span></i>
                        <i title="view sent folder" className="folder-content far fa-paper-plane" onClick={() => { this.onSetFolderFilter('sent'); this.onCloseMenu() }}><span>sent</span></i>
                        <i title="view trash folder" className="folder-content fas fa-trash-alt" onClick={() => { this.onSetFolderFilter('trash'); this.onCloseMenu() }}><span>trash</span></i>
                        <i title="view drafts" className="folder-content far fa-sticky-note" onClick={() => { this.onSetFolderFilter('drafts'); this.onCloseMenu() }}><span>drafts</span></i>
                    </nav>
                </div>

                <div className="email-right-layout">
                    <EmailFilter onSetFilter={this.onSetFilter} currentFolder={this.state.filterBy ? this.state.filterBy.folder : 'inbox'}/>
                </div>
                <EmailList emails={emails}/>
                {isNewEmail && <EmailCompose userComposer={emailService.getLoggedUser()} onCreateNewEmail={this.onCreateNewEmail} isOpen={isNewEmail}/>}
            </section>
        )
    }
}