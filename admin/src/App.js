import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { MainContext } from './Context/Context';

import LoginPage from './Pages/LoginPage/LoginPage';
import Dashboard from './Pages/Dashboard/Dashboard';

import './App.scss';
import Courses from './Pages/Courses/Courses';


const App = () => {

    const context = useContext(MainContext);


    return(
        <>
            <div className='main-header'>
                <h1>{context.webName}</h1>
            </div>

            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginPage}/>

                    <Route path="/dashboard" component={Dashboard}/>

                    <Route path="/courses" component={Courses}/>
                </Switch>
            </BrowserRouter>

            <div className='footer'>
                Copyright 2023, {context.webName}
            </div>
        </>
    )
}


export default App;