import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const emailService = {
    query,
    getLoggedUser,
    createEmail,
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

    }else {
        return Promise.resolve(gEmails.filter(email => email.folder === 'inbox'))
    }
}

function _saveEmailsToStorage() {
    storageService.saveToStorage(STORAGE_KAY, gEmails)
}

function _getEmailIdxById(emailId){
    return gEmails.findIndex(email => email.id === emailId)
}

function getLoggedUser(){
    return loggedInUser;
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
