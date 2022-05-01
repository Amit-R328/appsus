export function AddImgNote(props) {

    const { handleChange, note } = props
    const imgUrl = note.info.url || ''


    return (
        <div>
            <input type="file" accept="image/*" name="url" onChange={handleChange}/>
            <img src={imgUrl} alt="" className="img"/>
            <textarea style={{ ...note.style, fontWeight: 700 }} name="title" rows="1" cols="30" onChange={handleChange}
                value={note.info.title}>
            </textarea>
        </div>
    )
}