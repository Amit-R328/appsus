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
    getNoteByType,
    addRow,
    deleteRow,
    doneToggle,
    editNote,
}

const KEY = 'notesDB'

_creatNotes()



function query(filterBy) {
    let notes = _loadFromStorage()
    if (filterBy) {
        const { txt, colors, types, isPinned } = filterBy
        notes = notes.filter(note => {
            if (isPinned && note.isPinned === false) return false
            const info = note.info
            for (var key in info) {
                if (info[key].includes(txt)) {
                    const type = note.type
                    if (types.length === 0 || types.includes(type)) {
                        const {backgroundColor}  = note.style
                        if (colors.length === 0 || colors.includes(backgroundColor)) return true
                    }
                }
            }
            return false
        })
    }
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


function addRow(todos) {
    const row = {
        txt: 'Enter Todo',
        isDone: false
    }
    todos.push(row)
    return Promise.resolve(todos)
}


function getNoteByType(type) {
    let note = {
        type,
        isPinned: false,
        info: {
            title: 'Enter Title'
        }
    }

    switch (type) {
        case 'note-txt':
            note.info.txt = 'Enter Txt'
            break;
        case 'note-todos':
            note.info.todos = [
                {
                    txt: 'Enter Todo',
                    isDone: false
                }
            ]
            break;
        case 'note-img':
            note.info.url = 'Enter url'
    }

    return Promise.resolve(note)
}


function doneToggle(todos, idx, bool, noteId) {
    todos[idx].isDone = bool
    if (noteId) {
        getById(noteId)
            .then((note) => {
                note.info.todos = todos
                setNote(note, noteId)
            })
    }
    return Promise.resolve(todos)
}


function addNote({ note }) {
    const notes = _loadFromStorage()
    note.id = utilService.makeId()
    if(!note.style){
        note.style= {
            backgroundColor: "#FFFFFC"
        }
    }
    notes.push(note)
    _saveToStorage(notes)
    return Promise.resolve()
}


function deleteRow(todos, idx) {
    todos.splice(idx, 1)
    return Promise.resolve(todos)
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
    let notes = _loadFromStorage()
    notes = notes.map(note => {
        if (note.id !== noteId) return note
        return editNote
    })
    _saveToStorage(notes)
    return Promise.resolve()
}

function editNote(noteId, info) {
    const editIdx = _getNoteIdx(noteId)

    if (editIdx !== -1) {

        if (Object.keys(info)[0] === 'backgroundColor') {
            gNotes[editIdx].style = info
        } else {
            gNotes[editIdx].info = info
        }
        _saveNotesToStorage()
    }
}

function _getNoteIdx(noteId) {
    const idx = gNotes.findIndex(note => noteId === note.id);
    return idx;
}


function setPin(noteId) {
    let notes = _loadFromStorage()
    notes = notes.map(note => {
        if (note.id !== noteId) return note
        note.isPinned = !note.isPinned
        return note
    })
    _saveToStorage(notes)
    return Promise.resolve()
}


function setColor(color, noteId) {
    let notes = _loadFromStorage()
    notes = notes.map(note => {
        if (note.id !== noteId) return note
        note.style = { backgroundColor: color }
        return note
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
                style:{
                    backgroundColor: "#FFFFFC"
                }
            },
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!2"
                },
                style: {
                    backgroundColor: "#FFFFFC"
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

