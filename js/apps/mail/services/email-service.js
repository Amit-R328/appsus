import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const emailService = {
    query,
    getLoggedUser,
    createEmail,
    isUserTheComposer,
    toggleEmailRead,
    getUnReadEmailCount,
    toggleCheckAllEmails,
    moveFolder,
    deleteEmail,
    toggleCheckEmailById,
    getEmailFolder,
    toggleEmailStar,
    cleanAllCheckedEmails,
    draftToMail,
    saveDraft,
    sortMails,
}

const STORAGE_KAY = 'emailsDB'
let gEmails = storageService.loadFromStorage(STORAGE_KAY) || [{
    id: utilService.makeId(4),
    subject: 'Hello!',
    body: 'Did you know? Lorem ipsum dolor sit ame, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum ',
    isRead: true,
    isStared: true,
    isChecked: true,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'noam356@gmail.com',
    receiver: 'puki@appsus.com'
},
{
    id: utilService.makeId(4),
    subject: 'Catching up',
    body: 'Hey, how are you doing? my phone fall down',
    isRead: true,
    isStared: false,
    isChecked: false,
    folder: 'sent',
    sentAt: Date.now(),
    composer: 'puki@appsus.com',
    receiver: 'friend@appsus.com'
},
{
    id: utilService.makeId(4),
    subject: 'About the job',
    body: 'I would like to discuss your terms again',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'sent',
    sentAt: Date.now(),
    composer: 'puki@appsus.com',
    receiver: 'muki123@walla.co.il'
},
{
    id: utilService.makeId(4),
    subject: 'your subscription is about to end',
    body: 'Dear User,\nYour subscription is about to end, you might want to renew it.',
    isRead: false,
    isStared: false,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'netflix@netflixApp.com',
    receiver: 'puki@appsus.com'
},
{
    id: utilService.makeId(4),
    subject: 'About my offer',
    body: 'for a tiny sum of one million dollar i can reclaim',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'nigirian_prince@gmail.com',
    receiver: 'puki@appsus.com'
},
{
    id: utilService.makeId(4),
    subject: 'New message in group conversation with Opal Pinchas and Ori Ben Amram - Coding Academy',
    body: 'You have a new mention in Coding Academy - Mar 22 (codingacademy-mar22.slack.com)',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'notification@slack.com',
    receiver: 'puki@appsus.com'
},
{
    id: utilService.makeId(4),
    subject: 'intersting info',
    body: 'The hyperlink structure of the web is described by the webgraph: the nodes of the web graph correspond to the web pages (or URLs) the directed edges between them to the hyperlinks.',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'boring@slack.com',
    receiver: 'puki@appsus.com'
},
{
    id: utilService.makeId(4),
    subject: 'New message in group conversation with Opal Pinchas and Ori Ben Amram - Coding Academy',
    body: 'You have a new mention in Coding Academy - Mar 22 (codingacademy-mar22.slack.com)',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'notification@slack.com',
    receiver: 'puki@appsus.com'
},
]

_saveEmailsToStorage()

const loggedInUser = { email: 'puki@appsus.com', fullname: 'Puki Ben-David' }

function query(filterBy, sortBy) {
    if (filterBy) {
        const { searchTxt, isRead, isStared, folder } = filterBy
        let starFilter = false

        if (folder === 'starred') starFilter = true
        let filteredEmails = gEmails.filter(email => {
            return (
                (email.subject.toLowerCase().includes(searchTxt.toLowerCase()) ||
                    email.body.toLowerCase().includes(searchTxt.toLowerCase()) ||
                    email.composer.toLowerCase().includes(searchTxt.toLowerCase()) ||
                    email.receiver.toLowerCase().includes(searchTxt.toLowerCase())
                ) && (email.folder === folder || starFilter)
            )
        })

        if (folder === 'starred') filteredEmails = filteredEmails.filter(email => email.isStared)
        filteredEmails = sortMails(filteredEmails, sortBy)
        return Promise.resolve(filteredEmails)
    } else {
        gEmails = sortMails(gEmails, sortBy)
        return Promise.resolve(gEmails.filter(email => email.folder === 'inbox'))
    }
}

function sortMails(mails, sortBy = 'sentAt') {
    console.log('mails', mails)
    if (sortBy = 'subject') {
        mails.sort((a, b) => {
            if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1
            else if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1
            return 0
        })
    } else {
        mails.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return 1
            else if (a[sortBy] > b[sortBy]) return -1
            return 0
        })
    }
    return mails
}

function draftToMail(emailId, email) {
    const emailIdx = _getEmailIdxById(emailId)
    gEmails[emailIdx] = email
    gEmails[emailIdx].folder = 'sent'
    gEmails[emailIdx].sentAt = Date.now()
    _saveEmailsToStorage()
}

function saveDraft(emailId, draft) {
    const emailIdx = _getEmailIdxById(emailId)
    draft.sentAt = Date.now()
    gEmails[emailIdx] = draft
    _saveEmailsToStorage()
}

function cleanAllCheckedEmails() {
    gEmails.forEach(email => (email.isChecked = false))
    _saveEmailsToStorage()
}

function getEmailFolder(emailId) {
    const emailIdx = _getEmailIdxById(emailId);
    return gEmails[emailIdx].folder
}

function toggleEmailStar(emailId) {
    const emailIdx = _getEmailIdxById(emailId)
    gEmails[emailIdx].isStared = !gEmails[emailIdx].isStared
    _saveEmailsToStorage()
}

function _saveEmailsToStorage() {
    storageService.saveToStorage(STORAGE_KAY, gEmails)
}

function _getEmailIdxById(emailId) {
    return gEmails.findIndex(email => email.id === emailId)
}

function moveFolder(emailId, folder) {
    const emailIdx = _getEmailIdxById(emailId)
    if (gEmails[emailIdx].folder === 'trash' && folder === 'trash') {
        gEmails.splice(emailIdx, 1)
    } else {
        gEmails[emailIdx].folder = folder
    }
    _saveEmailsToStorage()
}

function deleteEmail(emailId) {
    const emailIdx = _getEmailIdxById(emailId)
    gEmails.splice(emailIdx, 1)
    _saveEmailsToStorage()
}

function getLoggedUser() {
    return loggedInUser;
}

function isUserTheComposer(composer) {
    return composer === loggedInUser.email
}

function toggleCheckEmailById(emailid) {
    const email = gEmails.find(email => email.id === email.id)
    if (email) {
        email.isChecked = !email.isChecked
        _saveEmailsToStorage()
    }
}

function toggleCheckAllEmails(filterBy, isChecked) {
    query(filterBy).then(emailsToToggle => {
        emailsToToggle.forEach(email => { email.isChecked = isChecked })
        _saveEmailsToStorage()
    })
}

function createEmail(subject, body, folder = "inbox", composer, receiver = loggedInUser.email) {
    const email = {
        id: utilService.makeId(4),
        subject,
        body,
        isRead: false,
        isStared: false,
        folder,
        sentAt: Date.now,
        composer,
        receiver: receiver
    }
    gEmails.push(email)
    _saveEmailsToStorage()
}

function toggleEmailRead(emailId) {
    const emailIdx = _getEmailIdxById(emailId)
    gEmails[emailIdx].isRead = !gEmails[emailIdx].isRead
    _saveEmailsToStorage();
}

function getUnReadEmailCount() {
    let sum = 0
    gEmails.forEach(email => {
        if (!email.isRead) sum++
    })
    return sum
}
