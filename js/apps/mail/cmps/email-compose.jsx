import { emailService } from "../services/email-service.js";
import { eventBusService } from "../../../services/event-bus-service.js"
import { Screen } from "../../../cmps/screen.jsx";



export function EmailCompose({ userComposer, onCreateNewEmail, isOpen }) {
    let removeEventBus = eventBusService.on('user-answer', (answer) => {
        if (answer === 'yes' && draft) {
            const { subject, body, composer, receiver } = draft
            if (subject || body || receiver) {
                emailService.createEmail(subject ? subject : '', body ? body : '', 'drafts', composer, receiver ? receiver : '')
            }
        }

        clearEventBus()
        onCreateNewEmail(false)
        clearInterval(draftInterval)
    })


    const clearEventBus = () => {
        removeEventBus()
    }

    let email = {
        composer: emailService.getLoggedUser().email,
        receiver: '',
        body: '',
        subject: ''
    }

    let draft = null
    let isDraftUpToDate = true

    var draftInterval = setInterval(() => {
        _saveDraft()
    }, 3000)

    const _saveDraft = () => {
        if (isDraftUpToDate) return
        draft = email
        isDraftUpToDate = true
    }

    const exitEditMode = () => {
        eventBusService.emit('user-msg', { txt: 'Save draft before exit?', type: 'confirm', time: 1000 * 999999 })
    }

    const handleChange = ({ target }) => {
        const { name, value } = target
        switch (name) {
            case 'mail-receiver':
                email.receiver = value
                break
            case 'mail-input':
                email.body = value
                break
            case 'mail-subject':
                email.subject = value
                break
        }
        isDraftUpToDate = false
        _saveDraft()

    }

    const sendEmail = () => {
        const { subject, body, composer, receiver } = email
        if (!subject || !body || !receiver) {
            eventBusService.emit('user-msg', { txt: 'Plaese fill all the fields', type: 'message', time: 2000 })
            return;
        } else {
            emailService.createEmail(subject, body, 'sent', composer, receiver)
            onCreateNewEmail(false)
        }
    }

    return (
        <React.Fragment>
            <Screen isOpen={isOpen} closeModal={()=>{exitEditMode()}}/>
            <section className="email-compose">
                <section className="email-details">
                    <section className="email-details-header">
                        <h2 className="email-new-msg">new message</h2>
                        <div className="details-back" onClick={() => { exitEditMode() }}>X</div>
                    </section>
                    <section className="details-composer">
                        <h2 className="composer-email">from: {userComposer.email}</h2>
                    </section>
                    <form className="email-metadata compose">
                        <div className="compose-receiver">
                            to:<input name="mail-receiver" className="email-input" autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="compose-subject">
                            subject:<input name="mail-subject" className="email-input" autoComplete="off" onChange={handleChange} />
                        </div>
                        <div className="compose-body">
                            <textarea name="mail-input" className="compose-input" type="text" placeholder="enter text here" onChange={handleChange}></textarea>
                        </div>
                    </form>
                    <button onClick={() => { sendEmail() }} className="send-email-btn">Send</button>
                </section>
            </section>
        </React.Fragment>

    )
}
