const { NavLink, withRouter } = ReactRouterDOM


function _AppHeader(props) {

    return (
        <header className="app-header">
            <h2 className="logo" onClick={() => props.history.push('/')}>Book App</h2>
            <nav className="nav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Books</NavLink>
            </nav>
        </header>
    )
}

export const AppHeader = withRouter(_AppHeader)