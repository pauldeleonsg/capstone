import { Link, NavLink } from 'react-router-dom';

import './Header.scss';


const Header = () => {
    return(
        <>
        <div className='header'>

            <div className="header__image">
                <a href="./">
                    <img className="logo" alt="hello!game" src={require('../../Assets/Images/pic-logo-hellogame-180x45.png')} />
                </a>
            </div>


            <div className="header__aside">
                
                <div className="header__placeholder header-card__search">
                    <input type="text" className="inpSearch" placeholder="Search" id="txtsearch" />
                </div>


                {/* <div className="header__placeholder header-card__upload">
                    <button className="btnUpload">Something</button>
                </div> */}


                <div className="header__placeholder header-card__image">
                    <a href="./">
                        <img className="avatar" src={require('../../Assets/Images/pic-avatar-profile.png')} alt="Profile" />
                    </a>
                </div>
            </div>

        </div>

        </>
    )
}


export default Header;