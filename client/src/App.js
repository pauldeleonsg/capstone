import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';

//components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//pages
import HomePage from './pages/HomePage/HomePage';
import Courses from './pages/Courses/Courses';


const App = () => {
    return(
        <>
        <div className='body-card'>
            
            <Header />

            <div className="buffer" />


            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage}/>

                    <Route path="/courses" component={Courses}/>
                </Switch>
            </BrowserRouter>
            

            <div className="buffer" />

            <Footer />

        </div>

        </>
    )
}


export default App;