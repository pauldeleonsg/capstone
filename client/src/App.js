import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';

//components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//pages
import HomePage from './pages/HomePage/HomePage';


const App = () => {
    return(
        <>
        <div className='body-card'>
            
            <Header />

            <div className="buffer" />


            <div className='content'>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                    </Switch>
                </BrowserRouter>
            </div>
            

            <div className="buffer" />

            <Footer />

        </div>

        </>
    )
}


export default App;