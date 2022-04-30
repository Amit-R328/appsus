export function ColorInput({ handleStyleChange, activeColors }) {

    const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF', "#FFFFFC", "#FDE2E4", "#DFE7FD"]

    return (
        <section className="input-container">
            <div className="items-container">
                {colors.map(color => {
                const activeClass = (activeColors) ? activeColors.includes(color) ? 'active' : '' :''
                  return  <div className={`item ${activeClass}`} key={color}
                        style={{ backgroundColor: color}}
                        onClick={() => handleStyleChange(color, 'colors')}>
                    </div>
                })}
            </div>
        </section>
    )
}