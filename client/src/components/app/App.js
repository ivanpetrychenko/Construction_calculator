import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {useHttp} from '../../hooks/http.hook';
import {useAuth} from '../../hooks/auth.hook';
import { useSelector, useDispatch } from 'react-redux';
import {usdCurrencyRequested} from '../../actions';
import {Calculator} from '../pages/Calculator';
import {LoginForm} from '../loginForm/LoginForm';
import {AdminPanel} from '../adminPanel/AdminPanel';

function App() {
    const {request} = useHttp();
    const login = useSelector(state => state.login);
    const dispatch = useDispatch();
    const {ready} = useAuth();

    useEffect(() => {
        request('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', 'GET', null, {})
            .then(data => {
                const usd = data.find(item => item.cc === "USD");
                return usd.rate
            })
            .then(data => {
                dispatch(usdCurrencyRequested(data));
            });
    }, [dispatch, request])

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
