export function ColorInput({ handleStyleChange }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']
    console.log('in')

    return (
        <section className="input-container">
            <div className="items-container">
                {colors.map(color => <div className="item" key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => handleStyleChange('backgroundColor', color)}>
                </div>)}
            </div>
        </section>
    )
}