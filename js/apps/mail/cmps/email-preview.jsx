import { utilService } from "../../../services/util.service.js";
import { LongTxt } from "../../../cmps/long-txt.jsx";

export function EmailPreview({email, onSelectedEmail, onCheckEmail, moveEmail, emailReadToggle, emailStarToggle, onSetDraft}){
    const {time, date} = utilService.getFormattedDateNTime(email.sentAt)
    
    const onEmailPreviewclick = () => {
        if(email.folder !== 'drafts'){
            onSelectedEmail(email)
        }else{
            onSetDraft(email)
            return
        }

        if(!email.isRead) emailReadToggle(email.id)
    }

    return (
    
        <section title="view email" className={`email-preview ${(email.isRead ? '' : 'email-unread')}`} onClick={(email) => {onEmailPreviewclick(email)}}>
            <div className="email-left">
                <label htmlFor="checked-email"></label>
                {email.isChecked && <input title="check email" type="checkbox" name="checked-email" onChange={()=>{onSelectedEmail(null);onCheckEmail(email.id)}} className="email-checkbox" checked/>}
                {!email.isChecked && <input title="check email" type="checkbox" name="checked-email"  onChange={()=>{onSelectedEmail(null);onCheckEmail(email.id)}} className="email-checkbox" />}
                <div onClick={(ev)=>{ev.stopPropagation(); emailStarToggle(email.id)}} className="email-star">
                    {email.isStared ? <i title="mark email as important" className="fas fa-star email-stared"></i> : <i className="far fa-star"></i>}
                </div>

            </div>
            <div className="email-center">
                <p className="email-address">{email.composer}</p>
                <LongTxt className="email-subject" text={email.subject}/>
                <p className="date">{`${time} ${date}`}</p>
            </div>
            <div className="email-right">
                <div onClick={(ev) =>{ev.stopPropagation(); emailReadToggle(email.id)}} className="email-read-envelope">
                    {email.isRead ? <i title="mark email as read / unread" className="far fa-envelope-open"></i> : <i className="fas fa-envelope"></i>}
                </div>
                <i title="send email to trash" onClick={(ev)=>{ev.stopPropagation(); moveEmail(email.id, 'trash')}} className="fas fa-trash-alt email-trash"></i>
            </div>
        </section>
    )
}