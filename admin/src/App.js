import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { MainContext } from './Context/Context';

import LoginPage from './Pages/LoginPage/LoginPage';

import './App.scss';


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
                </Switch>
            </BrowserRouter>

            <div className='footer'>
                footer
            </div>
        </>
    )
}


export default App;