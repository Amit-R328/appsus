const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { EmailApp } from "./js/apps/mail/pages/email-app.jsx";
import { AppHeader} from "./js/cmps/app-header.jsx"

import { AppHome } from "./js/pages/app-home.jsx";

export function App() {
    return (
        <Router>
            <header>
                <AppHeader/>
            </header>
            <main>
                <Switch>
                    {/* <Route path="./books" component={BooksApp}/> */}
                    {/* <Route path="/notes" component={NotesApp} /> */}
                    <Route path="/email" component={EmailApp} />
                    {/* <Route path="/about" component={About} /> */}
                    <Route exact path="/" component={AppHome} />
                </Switch>
            </main>
            <footer>
                {/* <AppFooter /> */}
            </footer>
            {/* <UserMsg /> */}
        </Router>

    )
    
}