import { hot } from 'react-hot-loader';
import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import ProtectedRoute from './Auth/ProtectedRoute'

import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/DashboardV2'



function App() {
    return (
        <BrowserRouter>
            <nav>
                <h3> For debug </h3>
                <ul>
                    <li>
                        <Link to="/user/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/user/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/user/user1/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path='/user/login' component={Login} />
                <Route exact path='/user/register' component={Register} />
                <ProtectedRoute path='/user/:user/dashboard'>
                    <Dashboard />
                </ProtectedRoute>
                <Route path='/share/:name'>
                    <Landing />
                </Route>
               <Route path='*' render={() => <div>404</div>} />
            </Switch>
        </BrowserRouter>
    );
  }




export default hot(module)(App);