import { NoteTxt } from "./dynmaic-note/note-txt.jsx"

export function NotePreview({note}) {

   
    return(
        <React.Fragment>
           <DynamicCmp note={note}/>
           <section className="note-edit">
               <button>delete</button>
               <button>color</button>
           </section>
        </React.Fragment>
    )
    
}

function DynamicCmp({note}) {
    switch (note.type) {
        case 'note-txt':
            return <NoteTxt {...note} />
    }
}