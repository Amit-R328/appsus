import { emailService } from "../services/email-service.js";
import { eventBusService } from "../../../services/event-bus-service.js";
import { Screen } from "../../../cmps/screen.jsx";


export function EmailDraftEdit({draft, onDraftEdit}){
    const initialDraft = JSON.parse(JSON.stringify(draft))

    let removeEventBus = eventBusService.on('user-answer', (answer) => {
        if(answer === 'yes') emailService.saveDraft(draft.id, draft)
        else emailService.saveDraft(draft.id, initialDraft)

        clearEventBus()
        onDraftEdit(false)
    })

    const clearEventBus = () => {
        removeEventBus()
    }

    const exitEditMode = () => {
        eventBusService.emit('user-msg', {txt: 'Save draft before exit?', type:'confirm', time: 1000*999999})
    }

    const handleChange = (ev) => {
        switch (ev.target.name){
            case 'mail-receiver':
                draft.receiver = ev.target.value
                break
            case 'mail-input':
                draft.body = ev.target.value
                break
            case 'mail-subject':
                draft.subject = ev.target.value
                break
        }
    }

    const sendEmail = () => {
        const { subject, body, receiver } = draft

        if(!subject || !body || !receiver){
            eventBusService.emit('user-msg', {txt: 'Please fill all the fields', type:'message', time:2000})
            return
        }else{
            emailService.draftToMail(draft.id, draft)
            onDraftEdit(null)
        }
    }

    return(
        <React.Fragment>
            <Screen isOpen={true} closeModal={() => {exitEditMode()}} />
            <section className="email-compose">
                <section className="email-details">
                    <div className="email-details-header">
                        <h2 className="email-new-msg">new message</h2>
                        <div className="details-back" onClick={() => {exitEditMode()}}>X</div>
                    </div>
                    <div className="details-composer">
                        <h2 className="composer-email">from: {draft.composer}</h2>
                    </div>
                    <form className="email-metadata compose">
                        <div className="compose-receiver">
                            to:<input name="mail-receiver" className="email-input" defaultValue={draft.receiver} autoComplete="off" onChange={handleChange}/>
                        </div>
                        <div className="compose-subject">
                            subject:<input name="mail-subject" className="email-input" defaultValue={draft.subject} autoComplete="off" onChange={handleChange}/>
                        </div>

                        <div className="compose-body">
                            <textarea name="mail-input" className="compose-input" type="text" defaultValue={draft.body} placeholder="enter text here" onChange={handleChange}></textarea>
                        </div>
                    </form>
                    <button onClick={() => {sendEmail()}} className="send-email-btn">Send</button>
                </section>
            </section>
        </React.Fragment>
    )
}