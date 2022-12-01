import { Link, NavLink } from 'react-router-dom';

import './App.scss';

import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';


const App = () => {
    return(
        <>
        <div className='body-card'>
            
            <Header />

            <div className="buffer" />

            <Content />

            <div className="buffer" />

            <Footer />

        </div>

        </>
    )
}


export default App;