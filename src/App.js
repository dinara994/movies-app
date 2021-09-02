import {BrowserRouter as Router, Route} from "react-router-dom"
import Movies from "./Movies";
import InfoMovie from "./InfoMovie";
import './index.css'


function App() {
    return (
        <Router className="App">
            <Route exact path='/'><Movies/></Route>
            <Route path='/moviesinfo/:id'><InfoMovie /></Route>
        </Router>
    );
}

export default App;
