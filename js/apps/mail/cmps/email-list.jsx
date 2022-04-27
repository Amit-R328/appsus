import { EmailPreview } from "./email-preview.jsx"

export function EmailList({ emails, onSelectedEmail, onCheckEmail, onCheckAllEmails, onMoveEmail, checkedEmails, emailReadToggle, emailStarToggle, onSetDraft }) {
    return (
        <div className="emails-body">
            <div className="emails-func">
                
                <div className="func-left">
                    <label htmlFor="checked-all-emails"></label>
                    <input title="mark all emails" type="checkbox" name="checked-all-emails" className="email-checkbox" onChange={(ev) => {onCheckAllEmails(ev.nativeEvent.target.checked)}}/>
                </div>

            </div>
            <section className="email-list">
                {emails.map(email => <EmailPreview key={email.id} email={email} />)}
            </section>
        </div>

    )
}