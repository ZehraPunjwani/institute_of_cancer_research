import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Genes from "./Genes";
import Gene from "../components/Gene";
import Header from "../components/Header";
import Error from "../components/Error";

function App() {
    return (
        <div className="App">
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/" component={Genes}/>
                    <Route exact path="/:id" component={Gene}/>
                    <Route path="*" component={Error}/>
                </Switch>
            </Router>
        </div>
);
}

export default App;
