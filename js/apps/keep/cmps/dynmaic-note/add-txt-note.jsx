

export function AddTxtNote( props) {

    const { handleChange } = props 
    const { note } = props

    return (
        <div>
            <textarea style={{ ...note.style, fontWeight: 700 }} name="title" rows="1" cols="30" onChange={handleChange}
                value={note.info.title}>
            </textarea>
            <textarea style={note.style} name="txt" rows="2" cols="50" onChange={handleChange}
                value={note.info.txt}>
            </textarea>
        </div>
    )
}