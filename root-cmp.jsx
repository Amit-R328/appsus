const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { EmailApp } from "./js/apps/mail/pages/email-app.jsx";
import { AppHeader} from "./js/cmps/app-header.jsx"
import { NoteApp } from "./js/apps/keep/pages/note-app.jsx";
import { AppHome } from "./js/pages/app-home.jsx";
import { UserMsg } from "./js/cmps/user-msg.jsx";

export function App() {
    return (
        <Router>
            <header>
                <AppHeader/>
            </header>
            <main>
                <Switch>
                    {/* <Route path="./books" component={BooksApp}/> */}
                    {/* <Route path="/notes/edit/:noteId?" component={NoteEdit} /> */}

                    <Route path="/notes" component={NoteApp} />
                    <Route path="/email" component={EmailApp} />
                    {/* <Route path="/about" component={About} /> */}
                    <Route exact path="/" component={AppHome} />
                </Switch>
            </main>
            <footer>
                {/* <AppFooter /> */}
            </footer>
            <UserMsg />
        </Router>

    )
    
}