export function ColorInput({ handleStyleChange }) {
    const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF','#9BF6FF','#A0C4FF','#BDB2FF','#FFC6FF',"#FFFFFC","#FDE2E4","#DFE7FD"]
    console.log('in')

    return (
        <section className="input-container">
            <div className="items-container">
                {colors.map(color => <div className="item" key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => handleStyleChange(color)}>
                </div>)}
            </div>
        </section>
    )
}