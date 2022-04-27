import { utilService } from "../../../services/util.service.js";

export function EmailPreview({email}){
    const {time, date} = utilService.getFormattedDateNTime(email.sentAt)
    return (
        <section className="email-preview">
            <div className="email-left">

            </div>
            <div className="email-center">
                <p>{email.composer}</p>
                <p>{`${time} ${date}`}</p>
            </div>
        </section>
    )
}