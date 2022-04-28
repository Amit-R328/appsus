import { Screen } from '../../../cmps/screen.jsx'
import { emailService } from "../services/email-service.js"
import { EmailList } from "../cmps/email-list.jsx"
import { EmailCompose } from "../cmps/email-compose.jsx"
import { EmailFilter } from "../cmps/email-filter.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"
import { EmailDetails } from "../cmps/email-details.jsx"
import { EmailDraftEdit } from '../cmps/email-draft-edit.jsx'


export class EmailApp extends React.Component {
    state = {
        emails: [],
        filterBy: null,
        selectedEmail: null,
        isNewEmail: false,
        draft: null,
        checkedEmails: [],
        isNavBarExpand: true,
        menuIsHover: false,
    }

    foldersNav = React.createRef();

    componentDidMount() {
        this.loadEmails()
    }

    componentWillUnmount() {
        emailService.cleanAllCheckedEmails();
    }


    loadEmails = () => {
        const emails = emailService.query(this.state.filterBy).then(emails => {
            this.setState({ emails, checkedEmails: emails.filter(email => email.isChecked) });
        })
    }

    onFoldersNavChange = (isOn) => {
        if (isOn) {
            this.setState({ isNavBarExpand: true })
        } else {
            this.setState({ isNavBarExpand: false })
        }
    }

    onMoveEmail = (emailId, folder) => {
        const emailFolder = emailService.getEmailFolder(emailId)

        if (folder === 'trash' && emailFolder === 'trash') {
            eventBusService.emit('user-msg', { txt: 'email deleted', type: 'message', time: 2000 })
        } else {
            eventBusService.emit('user-msg', { txt: `moved to ${folder}`, type: 'message', time: 2000 })
        }

        emailService.moveFolder(emailId, folder)
        this.loadEmails()
    }

    onSetFolderFilter = (folder) => {
        let thisFilterBy = this.state.filterBy
        const isStared = folder === 'starred' ? true : false

        if (!thisFilterBy) {
            thisFilterBy = {
                folder,
                searchTxt: '',
                isRead: false,
                isStared: isStared
            }
        } else {
            thisFilterBy = { ...thisFilterBy, folder: folder }
        }
        this.setState({ ...this.state, filterBy: thisFilterBy }, this.loadEmails)
    }

    onCheckEmail = (emailId) => {
        emailService.toggleCheckEmailById(emailId)
        this.loadEmails()
    }

    onFolderNavChange = (isOn) => {
        if (isOn) this.setState({ isNavBarExpend: true })
        else this.setState({ isNavBarExpend: false })
    }

    onOpenMenu = () => {
        this.foldersNav.current.classList.add('on-hover');
        this.setState( {menuIsHover: true});
    }
    onCloseMenu = () => {
        this.foldersNav.current.classList.remove('on-hover')
        this.setState( {menuIsHover: false});
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
        this.setState({ isNewEmail: isOn })
    }

    onDraftEdit = (isOn) => {
        this.setState({ draft: isOn })
        this.loadEmails()
    }

    onSetDraft = (email) => {
        this.setState({ draft: email })
    }

    onEmailReadToggle = (emailId) => {
        emailService.toggleEmailRead(emailId)
        eventBusService.emit('update-unread-emails', emailService.getUnReadEmailCount())
        this.loadEmails()
    }

    onEmailStarToggle = (emailId) => {
        emailService.toggleEmailStar(emailId)
        this.loadEmails()
    }

    render() {
        const { emails, selectedEmail, isNewEmail, draft, isNavBarExpand, menuIsHover } = this.state
        if (!emails) return <h1>Loading...</h1>
        return (
            <section className="email-app main-layout">
                <React.Fragment>
                    <Screen isOpen={selectedEmail} closeModal={this.onSelectedEmail} />
                    <Screen isOpen={menuIsHover} closeModal={this.onCloseMenu} />
                </React.Fragment>
                <div className="email-layout">
                    <div className="email-left-layout">
                        <nav ref={this.foldersNav} className="email-folders" onMouseEnter={() => { this.onFoldersNavChange(true) }} onMouseLeave={() => { this.onFoldersNavChange(false) }}>
                            <i title="compose new email" className="folder-content fas fa-plus new-compose" onClick={() => { this.onCreateNewEmail(true); this.onCloseMenu() }}>{(isNavBarExpand || menuIsHover) && <span>new email</span>}</i>
                            <i title="view inbox" className="folder-content far fa-envelope" onClick={() => { this.onSetFolderFilter('inbox'); this.onCloseMenu() }}>{(isNavBarExpand || menuIsHover) && <span>inbox</span>}</i>
                            <i title="view all starred emails" className="folder-content far fa-star" onClick={() => { this.onSetFolderFilter('starred'); this.onCloseMenu() }}>{(isNavBarExpand || menuIsHover) && <span>starred</span>}</i>
                            <i title="view sent folder" className="folder-content far fa-paper-plane" onClick={() => { this.onSetFolderFilter('sent'); this.onCloseMenu() }}>{(isNavBarExpand || menuIsHover) && <span>sent</span>}</i>
                            <i title="view trash folder" className="folder-content fas fa-trash-alt" onClick={() => { this.onSetFolderFilter('trash'); this.onCloseMenu() }}>{(isNavBarExpand || menuIsHover) && <span>trash</span>}</i>
                            <i title="view drafts" className="folder-content far fa-sticky-note" onClick={() => { this.onSetFolderFilter('drafts'); this.onCloseMenu() }}>{(isNavBarExpand || menuIsHover) && <span>drafts</span>}</i>
                        </nav>
                    </div>

                    <div className="email-right-layout">
                        <div className='email-filter'>
                            <EmailFilter onSetFilter={this.onSetFilter} currentFolder={this.state.filterBy ? this.state.filterBy.folder : 'inbox'} />
                        </div>
                        <EmailList emails={emails} onSelectedEmail={this.onSelectedEmail} onCheckEmail={this.onCheckEmail} onCheckAllEmails={this.onCheckAllEmails} onMoveEmail={this.onMoveEmail} checkedEmails={this.state.checkedEmails} emailReadToggle={this.onEmailReadToggle} emailStarToggle={this.onEmailStarToggle} onSetDraft={this.onSetDraft} />
                    </div>
                    {selectedEmail && <EmailDetails email={selectedEmail} onSelectedEmail={this.onSelectedEmail} />}
                    {isNewEmail && <EmailCompose userComposer={emailService.getLoggedUser()} onCreateNewEmail={this.onCreateNewEmail} isOpen={isNewEmail} />}
                    {draft && <EmailDraftEdit onDraftEdit={this.onDraftEdit} draft={this.state.draft} />}
                </div>

            </section>
        )
    }
}