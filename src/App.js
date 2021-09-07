import {BrowserRouter as Router, Route} from "react-router-dom"
import Movies from "./Components/Movies/Movies";
import InfoMovie from "./Components/InfoMovie/InfoMovie";
import './index.css'
import Person from "./Components/Person";
import Cast from "./Components/Cast/Cast";
import Home from "./Views/Home";
import Header from "./Views/Header";
import Search from "./Views/Search";



function App() {
    return (
        <Router className="App">
            <Header/>
           <div className="container">
               <Route exact path='/'><Home /></Route>
               <Route exact path='/'><Movies /></Route>
               <Route path='/moviesinfo/:id'><InfoMovie /></Route>
               <Route path='/person/:id'><Person /></Route>
               <Route path='/cast/:id'><Cast /></Route>
               <Route path='/search/:name'><Search /></Route>
           </div>
        </Router>
    );
}

export default App;
