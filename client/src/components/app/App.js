import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {useServiceContext} from '../../context/ServiceAppContext';
import { useSelector, useDispatch } from 'react-redux';
import {usdCurrencyRequested} from '../../actions';
import {Calculator} from '../pages/Calculator';
import {LoginForm} from '../loginForm/LoginForm';
import {AdminPanel} from '../adminPanel/AdminPanel';

function App() {
    const {getCurrency} = useServiceContext();
    const login = useSelector(state => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        getCurrency()
            .then(data => {
                const usd = data.find(item => item.cc === "USD");
                return usd.rate
            })
            .then(data => dispatch(usdCurrencyRequested(data)));
    }, [dispatch, getCurrency])

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
