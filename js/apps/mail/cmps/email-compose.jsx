import { emailService } from "../services/email-service.js";
import {eventBusService} from "../../../services/event-bus-service.js"


export function EmailCompose({userComposer, onCreateNewEmail, isOpen}){
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
    },3000)

    const _saveDraft = () => {
        
    }

    return(
        <section className="email-compose">
            <section className="email-details">
                <section className="email-details-header">
                    <h2 className="email-new-msg">new message</h2>
                    <div className="details-back" onClick={()=>{exitEditMode()}}>X</div>
                </section>
            </section>
        </section>
    )
}