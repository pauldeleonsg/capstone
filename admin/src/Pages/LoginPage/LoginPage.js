import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

//import { MainContext } from '../../Context/Context';


const LoginPage = () => {
    //const navigate = useNavigate();

    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    // User Login info
    const database = [
        {
            username: "admin",
            password: "admin"
        }
    ];


    const errors = {
        uname: "Invalid username",
        pass: "Invalid password"
    };


    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
                // Username not found
                setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
    );


    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
            <div className="input-container">
                <label>Username : </label>
                <input type="text" name="uname" required />
                {renderErrorMessage("uname")}
            </div>
            <div className="input-container">
                <label>Password : </label>
                <input type="password" name="pass" required />
                {renderErrorMessage("pass")}
            </div>
            <div className="button-container">
                <input type="submit" />
            </div>
            </form>
        </div>
    );


    return (
        <>
        <div className="login">
            <div className="login-form">
            <div className="login-form__title"><h2>Login</h2></div>
            {/* {isSubmitted ? <div>User is successfully logged in</div> : renderForm} */}

            {isSubmitted ? <Redirect to="/dashboard" /> : renderForm}
            

            </div>
        </div>
        </>
    );
}


export default LoginPage;



//reference:
//https://contactmentor.com/login-form-react-js-code/