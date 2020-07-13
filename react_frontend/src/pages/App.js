import React from 'react';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Genes from "./Genes";
import Gene from "../components/Gene";
import Header from "../components/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/" component={Genes}/>
                    <Route path="/:id" component={Gene}/>
                </Switch>
            </Router>
        </div>
);
}

export default App;
