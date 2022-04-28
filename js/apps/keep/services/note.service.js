import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    addNote,
    deleteNote,
    setColor,
    setPin,
    createNote,
    getById,
    setNote,
}


const KEY = 'notesDB'

_creatNotes()




function query() {
    let notes = _loadFromStorage()
    return Promise.resolve(notes)
}

function createNote(title, body) {
    let notes = _loadFromStorage()
    const note = {
        id: "n1011111",
        type: "note-txt",
        isPinned: true,
        info: {
            title: title,
            txt: body,
        },
        style: {
            backgroundColor: "#00d"
        }
    }
    notes.push(note)
    _saveToStorage(notes)
}


function addNote({ note }) {
    const notes = _loadFromStorage()
    note.id = utilService.makeId()
    notes.push(note)
    _saveToStorage(notes)
    return Promise.resolve()

}

function deleteNote(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function setNote(editNote, noteId) {
    console.log(editNote)
    let notes = _loadFromStorage()
    notes = notes.map(note => {
        if (note.id !== noteId) return note
        else {
            return editNote
        }
    })
    _saveToStorage(notes)
    return Promise.resolve()
}

function setPin(noteId) {
    let notes = _loadFromStorage()
    notes = notes.map(note => {
        if (note.id !== noteId) return note
        else {
            note.isPinned = !note.isPinned
            return note
        }
    })
    _saveToStorage(notes)
    return Promise.resolve()

}


function setColor(color, noteId) {
    let notes = _loadFromStorage()
    notes = notes.map(note => {
        if (note.id !== noteId) return note
        else {
            note.style = { backgroundColor: color }
            return note
        }
    })
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

