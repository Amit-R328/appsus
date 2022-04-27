const { NavLink, withRouter } = ReactRouterDOM
class _AppHeader extends React.Component{
    
    

    render(){
        return (
            <header className="header">
                <div className="logo">
                    <NavLink to="/"><img src="assests\img\logo.png"/></NavLink>
                </div>
                <nav className="nav">
                    <NavLink to="/"></NavLink>
                    <NavLink to="/email">emails</NavLink>
                    <NavLink to="/notes"></NavLink>
                    <NavLink to="/about"></NavLink>
                </nav>
            </header>
        )
    }
}
export const AppHeader = withRouter(_AppHeader)