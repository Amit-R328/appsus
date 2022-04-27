import { utilService } from "../../../services/util.service.js";
import { LongTxt } from "../../../cmps/long-txt.jsx";

export function EmailPreview({email}){
    const {time, date} = utilService.getFormattedDateNTime(email.sentAt)
    return (
        <section className="email-preview">
            <div className="email-left">

            </div>
            <div className="email-center">
                <p>{email.composer}</p>
                <LongTxt text={email.subject}/>
                <p>{`${time} ${date}`}</p>
            </div>
            <div className="email-right">
                
            </div>
        </section>
    )
}