import React from "react";
import { useState, createContext } from "react";
import axios from "axios";


export const MainContext = createContext();

export default function ContextProvider(props) {
    const webName = 'hello!game admin';
    

    //loginData
    const [loginData, setLoginData] = useState({
        adminId: 'admin',
        adminPwd: 'p@55w0rd'
    });    

    const passLoginData = (data) => {
        setLoginData(data);
    };

    return (
        <MainContext.Provider
            value={{
                webName,
                loginData,
                setLoginData,
                passLoginData
            }}>
            {props.children}
        </MainContext.Provider>
    );
}
