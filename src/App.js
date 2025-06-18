import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";

function App() {
    return (
        <Router>
            <div className='App'>
                <NavBar />
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/contact'></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
