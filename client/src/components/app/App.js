import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {useAuth} from '../../hooks/auth.hook';
import { useSelector } from 'react-redux';
import {Calculator} from '../pages/Calculator';
import {LoginForm} from '../loginForm/LoginForm';
import {AdminPanel} from '../adminPanel/AdminPanel';

function App() {
    const login = useSelector(state => state.login);
    // eslint-disable-next-line
    const {ready} = useAuth();

    return (
        <section className="app">
            <h1 className="app__title">Калькулятор вартості ремонту</h1>
            <Router>
                <Switch>
                    <Route path = '/' exact component={Calculator}/>
                    <Route exact path="/login">
                        {login ? <Redirect to="/admin" /> : <LoginForm />}
                    </Route>
                    <Route path = '/admin' exact component={AdminPanel}/>
                    <Redirect to="/" />
                </Switch>
            </Router>
        </section>
    );
}

export default App;
