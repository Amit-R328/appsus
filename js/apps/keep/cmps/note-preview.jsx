import { NoteTxt } from "./dynmaic-note/note-txt.jsx"

export function NotePreview({note}) {

   
    return(
        <section className="note-preview">
           note preview
           <DynamicCmp note={note}/>
        </section>
    )
    
}

function DynamicCmp({note}) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt {...note} />
    }
}