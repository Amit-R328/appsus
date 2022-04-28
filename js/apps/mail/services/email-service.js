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
}

const STORAGE_KAY = 'emailsDB'
const gEmails = storageService.loadFromStorage(STORAGE_KAY) || [{
    id: utilService.makeId(4),
    subject: 'About my offer',
    body:'for a tiny sum of one million dollar i can reclaim',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'nigirian_prince@gmail.com',
    receiver: 'puki@appsus.com'
},
{   id: utilService.makeId(4),
    subject: 'Catching up',
    body:'Hey, how are you doing? my phone fall down',
    isRead: true,
    isStared: false,
    isChecked: false,
    folder: 'sent',
    sentAt: Date.now(),
    composer: 'puki@appsus.com',
    receiver: 'friend@appsus.com' 
},
{   id: utilService.makeId(4),
    subject: 'About the job',
    body:'I would like to discuss your terms again',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'sent',
    sentAt: Date.now(),
    composer: 'puki@appsus.com',
    receiver: 'muki123@walla.co.il' 
},
{   id: utilService.makeId(4),
    subject: 'your subscription is about to end',
    body:'Dear User,\nYour subscription is about to end, you might want to renew it.',
    isRead: false,
    isStared: false,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'netflix@netflixApp.com',
    receiver: 'puki@appsus.com' 
},
{   id: utilService.makeId(4),
    subject: 'About my offer',
    body:'for a tiny sum of one million dollar i can reclaim',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'nigirian_prince@gmail.com',
    receiver: 'puki@appsus.com' 
},
{   id: utilService.makeId(4),
    subject: 'About my offer',
    body:'for a tiny sum of one million dollar i can reclaim',
    isRead: true,
    isStared: true,
    isChecked: false,
    folder: 'inbox',
    sentAt: Date.now(),
    composer: 'nigirian_prince@gmail.com',
    receiver: 'puki@appsus.com' 
},
]

_saveEmailsToStorage()

const loggedInUser = { email: 'puki@appsus.com', fullname: 'Puki Ben-David'}

function query(filterBy){
    if(filterBy){
        const { searchTxt, isRead, isStared, folder} = filterBy
        let starFilter = false

        if( folder === 'starred') starFilter = true
        let filteredEmails = gEmails.filter(email => {
            return (
                (email.subject.toLowerCase().includes(searchTxt.toLowerCase()) ||
                email.body.toLowerCase().includes(searchTxt.toLowerCase()) ||
                email.composer.toLowerCase().includes(searchTxt.toLowerCase()) ||
                email.receiver.toLowerCase().includes(searchTxt.toLowerCase())
            ) && (email.folder === folder || starFilter)
            )
        })

        if(folder === 'starred') filteredEmails = filteredEmails.filter(email => email.isStared)
        return Promise.resolve(filteredEmails)
    }else {
        return Promise.resolve(gEmails.filter(email => email.folder === 'inbox'))
    }
}

function draftToMail(emailId, email){
    const emailIdx = _getEmailIdxById(emailId)
    gEmails[emailIdx] = email
    gEmails[emailIdx].folder = 'sent'
    gEmails[emailIdx].sentAt = Date.now()
    _saveEmailsToStorage()
}

function saveDraft(emailId, draft){
    const emailIdx = _getEmailIdxById(emailId)
    draft.sentAt = Date.now()
    gEmails[emailIdx] = draft
    _saveEmailsToStorage()
}

function cleanAllCheckedEmails(){
    gEmails.forEach(email => (email.isChecked = false))
    _saveEmailsToStorage()
}

function getEmailFolder(emailId){
    const emailIdx = _getEmailIdxById(emailId);
    return gEmails[emailIdx].folder
}

function toggleEmailStar(emailId){
    const emailIdx = _getEmailIdxById(emailId)
    gEmails[emailIdx].isStared = !gEmails[emailIdx].isStared
    _saveEmailsToStorage()
}

function _saveEmailsToStorage() {
    storageService.saveToStorage(STORAGE_KAY, gEmails)
}

function _getEmailIdxById(emailId){
    return gEmails.findIndex(email => email.id === emailId)
}

function moveFolder(emailId, folder){
    const emailIdx = _getEmailIdxById(emailId)
    if(gEmails[emailIdx].folder === 'trash' && folder === 'trash'){
        gEmails.splice(emailIdx, 1)
    }else {
        gEmails[emailIdx].folder = folder
    }
    _saveEmailsToStorage()
}

function deleteEmail(emailId){
    const emailIdx = _getEmailIdxById(emailId)
    gEmails.splice(emailIdx,1)
    _saveEmailsToStorage()
}

function getLoggedUser(){
    return loggedInUser;
}

function isUserTheComposer(composer) {
    return composer === loggedInUser.email
}

function toggleCheckEmailById(emailid){
    const email = gEmails.find(email => email.id === email.id)
    if(email){
        email.isChecked = !email.isChecked
        _saveEmailsToStorage()
    }
}

function toggleCheckAllEmails(filterBy, isChecked){
    query(filterBy).then(emailsToToggle => {
        emailsToToggle.forEach(email => { email.isChecked = isChecked})
        _saveEmailsToStorage()
    })
}

function createEmail(subject, body, folder="inbox", composer, receiver = loggedInUser.email){
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

function toggleEmailRead(emailId){
    const emailIdx = _getEmailIdxById(emailId)
    gEmails[emailIdx].isRead = !gEmails[emailIdx].isRead
    _saveEmailsToStorage();
}

function getUnReadEmailCount(){
    let sum = 0
    gEmails.forEach(email => {
        if(!email.isRead) sum++
    })
    return sum
}
