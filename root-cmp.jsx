const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
import { EmailApp } from "./js/apps/mail/pages/email-app.jsx";
import { AppHeader} from "./js/cmps/app-header.jsx"
import { NoteApp } from "./js/apps/keep/pages/note-app.jsx";
import { BookApp } from './js/apps/book/pages/book-app.jsx'
import { AppHome } from "./js/pages/app-home.jsx";
import { UserMsg } from "./js/cmps/user-msg.jsx";
import { NoteDetails } from "./js/apps/keep/pages/note-details.jsx";
import { BookDetails } from "./js/apps/book/pages/book-details.jsx";
import { BookReview } from "./js/apps/book/pages/book-review.jsx";


export function App() {
    return (
        <Router>
                <AppHeader/>
            <main>
                <Switch>
                    
                    <Route path="/notes/:noteId" component={NoteDetails} />
                    <Route path="/book/review/:bookId" component={BookReview}/>

                    <Route path="/book/:bookId" component={BookDetails}/>

                    <Route path="/notes" component={NoteApp} />
                    <Route path="/email" component={EmailApp} />
                    <Route path="/book" component={BookApp}/>
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