import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    addNote
}

const KEY = 'notesDB'

_creatNotes()



function query() {
    let notes = _loadFromStorage()
    return Promise.resolve(notes)
}


function addNote({note}){
    const notes = _loadFromStorage()
    note.id = utilService.makeId()
    notes.push(note)
    _saveToStorage(notes)
    return Promise.resolve()

}



function _creatNotes() {
    const notes = _loadFromStorage()
    if (!notes) {
        const notes = [
            {
                id: "n10111",
                type: "note-txt",
                isPinned: true,
                info: {
                    title: "Bobi and Me",
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!2"
                }
            }]
        _saveToStorage(notes)
    }
}


function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

